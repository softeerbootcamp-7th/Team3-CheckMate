package com.checkmate.backend.domain.analysis.processor.menu;

import com.checkmate.backend.domain.analysis.context.MenuAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.OrderMenus;
import com.checkmate.backend.domain.analysis.dto.projection.MenuIdNameProjection;
import com.checkmate.backend.domain.analysis.dto.projection.OrderMenusProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.menu.PopularMenuCombinationResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.menu.repository.MenuRepository;
import com.checkmate.backend.domain.order.repository.MenuAnalysisRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.*;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

/** MNU_05(인기 메뉴 조합) */
@Component
@RequiredArgsConstructor
@Slf4j
public class PopularMenuCombinationProcessor implements AnalysisProcessor<MenuAnalysisContext> {
    private final MenuAnalysisRepository menuAnalysisRepository;
    private final MenuRepository menuRepository;
    private final ObjectMapper objectMapper;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.MNU_05 == analysisCardCode.getMetricCode();
    }

    @Transactional(readOnly = true, isolation = Isolation.REPEATABLE_READ)
    @Override
    public AnalysisResponse process(MenuAnalysisContext context) {

        // 매출 기준 top3 메뉴 조회 (기준 메뉴)
        List<Long> top3MenuIds =
                menuAnalysisRepository.findTop3MenuIds(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        // 주문별 메뉴 리스트 조회 (각 주문에 포함된 메뉴ID 리스트)
        List<OrderMenusProjection> orderMenuProjections =
                menuAnalysisRepository.findOrderMenuBundles(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        // JSON 문자열로 된 주문 메뉴 ID를 List<Long>으로 변환하여 OrderMenus 리스트 생성
        List<OrderMenus> orderMenus = new ArrayList<>();

        for (OrderMenusProjection projection : orderMenuProjections) {
            List<Long> menuIds = Collections.emptyList();
            try {
                menuIds = objectMapper.readValue(projection.menuIds(), new TypeReference<>() {});
            } catch (JsonProcessingException e) {
                log.warn(
                        "[PopularMenuCombinationProcessor] JSON parsing failed for orderId={}",
                        projection.orderId(),
                        e);
            }

            orderMenus.add(new OrderMenus(projection.orderId(), menuIds));
        }

        // Top3 메뉴 기준으로 조합 카운트 맵 초기화 (baseMenu -> pairedMenu -> count)
        Map<Long, Map<Long, Long>> combinationCountMap = new LinkedHashMap<>();

        for (Long top3MenuId : top3MenuIds) {
            combinationCountMap.put(top3MenuId, new HashMap<>());
        }

        // 주문 데이터를 순회하며 baseMenu 기준으로 pairedMenu 카운트
        for (OrderMenus order : orderMenus) {
            List<Long> menus = order.menuIds();

            for (Long u : menus) {
                if (!top3MenuIds.contains(u)) continue; // top3 메뉴만 기준

                Map<Long, Long> pairedCountMap = combinationCountMap.get(u);

                for (Long v : menus) {
                    if (u.equals(v)) continue;

                    pairedCountMap.put(v, pairedCountMap.getOrDefault(v, 0L) + 1);
                }
            }
        }

        // 모든 메뉴ID 집합 수집 (u와 v 메뉴 모두 포함)
        Set<Long> menuIds = new HashSet<>();
        combinationCountMap.forEach(
                (u, vMap) -> {
                    menuIds.add(u); // u 메뉴 ID
                    menuIds.addAll(vMap.keySet()); // v 메뉴 ID
                });

        // 메뉴 이름 조회
        List<MenuIdNameProjection> menuIdAndName = menuRepository.findMenuIdAndNameByIds(menuIds);
        Map<Long, String> menuIdToNameMap =
                menuIdAndName.stream()
                        .collect(
                                Collectors.toMap(
                                        MenuIdNameProjection::menuId,
                                        MenuIdNameProjection::menuName));

        // DTO 변환
        List<PopularMenuCombinationResponse.PopularMenuCombinationItem> items = new ArrayList<>();

        for (Long baseMenuId : combinationCountMap.keySet()) {
            Map<Long, Long> pairedCountMap = combinationCountMap.get(baseMenuId);

            // paired 메뉴를 count 내림차순 정렬 후 DTO 변환
            List<Map.Entry<Long, Long>> sortedPairedEntries =
                    pairedCountMap.entrySet().stream()
                            .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                            .toList();

            // 정렬된 paired 메뉴를 DTO로 변환
            List<PopularMenuCombinationResponse.PopularMenuCombinationItem.PairedMenuItem>
                    pairedMenus =
                            sortedPairedEntries.stream()
                                    .map(
                                            entry ->
                                                    new PopularMenuCombinationResponse
                                                            .PopularMenuCombinationItem
                                                            .PairedMenuItem(
                                                            menuIdToNameMap.get(
                                                                    entry
                                                                            .getKey()), // pairedMenu 이름
                                                            entry.getValue() // 카운트
                                                            ))
                                    .toList();

            items.add(
                    new PopularMenuCombinationResponse.PopularMenuCombinationItem(
                            menuIdToNameMap.get(baseMenuId), // baseMenu 이름
                            pairedMenus));
        }

        PopularMenuCombinationResponse response = new PopularMenuCombinationResponse(items);

        return new AnalysisResponse(context.getAnalysisCardCode(), response, response);
    }
}
