package com.checkmate.backend.domain.analysis.processor.menu;

import com.checkmate.backend.domain.analysis.context.MenuAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.projection.menu.TimeSlotMenuOrderCountProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.menu.DashboardTimeSlotMenuOrderCountResponse;
import com.checkmate.backend.domain.analysis.dto.response.menu.DetailTimeSlotMenuOrderCountResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.order.repository.MenuAnalysisRepository;
import java.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** MNU_03 (시간대별 메뉴 주문건수) */
@Component
@RequiredArgsConstructor
@Slf4j
public class TimeSlotMenuOrderCountProcessor implements AnalysisProcessor<MenuAnalysisContext> {

    private final MenuAnalysisRepository menuAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.MNU_03 == analysisCardCode.getMetricCode();
    }

    @Override
    public AnalysisResponse process(MenuAnalysisContext context) {

        List<TimeSlotMenuOrderCountProjection> menuOrderCountsByTimeSlot =
                menuAnalysisRepository.findMenuCountPerTimeSlot(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        // 슬롯별 그룹핑
        Map<Integer, List<TimeSlotMenuOrderCountProjection>> groupedByTimeSlot =
                new LinkedHashMap<>();

        // 빈 슬롯 생성
        for (int slot = 0; slot <= 22; slot += 2) {
            groupedByTimeSlot.put(slot, new ArrayList<>());
        }

        // 데이터 채우기
        for (TimeSlotMenuOrderCountProjection m : menuOrderCountsByTimeSlot) {
            groupedByTimeSlot.get(m.timeSlot2H()).add(m);
        }

        List<DetailTimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem> timeSlotGroups =
                new ArrayList<>();

        for (Map.Entry<Integer, List<TimeSlotMenuOrderCountProjection>> entry :
                groupedByTimeSlot.entrySet()) {

            Integer timeSlot = entry.getKey();
            List<TimeSlotMenuOrderCountProjection> menus = entry.getValue();

            // 슬롯의 전체 주문 건수
            long totalCount =
                    menus.stream().mapToLong(TimeSlotMenuOrderCountProjection::orderCount).sum();

            // 주문건수 내림차순 정렬
            menus.sort(
                    Comparator.comparing(TimeSlotMenuOrderCountProjection::orderCount).reversed());

            List<
                            DetailTimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem
                                    .TimeSlotMenuOrderCountItem>
                    menuItems = new ArrayList<>();

            if (menus.size() <= 3) {
                for (TimeSlotMenuOrderCountProjection menu : menus) {
                    menuItems.add(
                            new DetailTimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem
                                    .TimeSlotMenuOrderCountItem(
                                    menu.menuName(), menu.orderCount()));
                }
            } else {
                // TOP 3
                for (int i = 0; i < 3; i++) {
                    TimeSlotMenuOrderCountProjection menu = menus.get(i);

                    menuItems.add(
                            new DetailTimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem
                                    .TimeSlotMenuOrderCountItem(
                                    menu.menuName(), menu.orderCount()));
                }

                // 기타
                long etcCount =
                        menus.subList(3, menus.size()).stream()
                                .mapToLong(TimeSlotMenuOrderCountProjection::orderCount)
                                .sum();

                menuItems.add(
                        new DetailTimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem
                                .TimeSlotMenuOrderCountItem("기타", etcCount));
            }

            // 슬롯별 Response 객체 생성
            timeSlotGroups.add(
                    new DetailTimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem(
                            timeSlot, totalCount, menuItems));
        }

        DetailTimeSlotMenuOrderCountResponse response =
                new DetailTimeSlotMenuOrderCountResponse(timeSlotGroups);

        // orderCount가 가장 높은 메뉴 찾기
        Optional<TimeSlotMenuOrderCountProjection> maxOrderMenu =
                menuOrderCountsByTimeSlot.stream()
                        .max(
                                Comparator.comparingLong(
                                        TimeSlotMenuOrderCountProjection::orderCount));

        DashboardTimeSlotMenuOrderCountResponse dashboardResponse =
                maxOrderMenu
                        .map(
                                p ->
                                        new DashboardTimeSlotMenuOrderCountResponse(
                                                p.timeSlot2H(), p.menuName()))
                        .orElse(null); // max가 없으면 null

        return new AnalysisResponse(context.getAnalysisCardCode(), dashboardResponse, response);
    }
}
