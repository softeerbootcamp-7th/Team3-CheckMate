package com.checkmate.backend.domain.analysis.processor.menu;

import com.checkmate.backend.domain.analysis.context.MenuAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.projection.TimeSlotMenuOrderCountProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.menu.TimeSlotMenuOrderCountResponse;
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

        for (TimeSlotMenuOrderCountProjection m : menuOrderCountsByTimeSlot) {

            groupedByTimeSlot.computeIfAbsent(m.timeSlot2H(), (k) -> new ArrayList<>()).add(m);
        }

        List<TimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem> timeSlotGroups =
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

            List<TimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem.TimeSlotMenuOrderCountItem>
                    menuItems = new ArrayList<>();

            if (menus.size() <= 3) {
                for (TimeSlotMenuOrderCountProjection menu : menus) {
                    menuItems.add(
                            new TimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem
                                    .TimeSlotMenuOrderCountItem(
                                    menu.menuName(), menu.orderCount()));
                }
            } else {
                // TOP 3
                for (int i = 0; i < 3; i++) {
                    TimeSlotMenuOrderCountProjection menu = menus.get(i);

                    menuItems.add(
                            new TimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem
                                    .TimeSlotMenuOrderCountItem(
                                    menu.menuName(), menu.orderCount()));
                }

                // 기타
                long etcCount =
                        menus.subList(3, menus.size()).stream()
                                .mapToLong(TimeSlotMenuOrderCountProjection::orderCount)
                                .sum();

                menuItems.add(
                        new TimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem
                                .TimeSlotMenuOrderCountItem("기타", etcCount));
            }

            // 슬롯별 Response 객체 생성
            timeSlotGroups.add(
                    new TimeSlotMenuOrderCountResponse.TimeSlotMenuGroupItem(
                            timeSlot, totalCount, menuItems));
        }

        TimeSlotMenuOrderCountResponse response =
                new TimeSlotMenuOrderCountResponse(timeSlotGroups);

        return new AnalysisResponse(
                context.getAnalysisCardCode(),
                response, // dashboard용
                response // detail용 (필요 없으면 null 넣어도 됨)
                );
    }
}
