package com.checkmate.backend.domain.analysis.factory;

import com.checkmate.backend.domain.analysis.context.AnalysisContext;
import com.checkmate.backend.domain.analysis.context.MenuAnalysisContext;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.DomainCategory;
import com.checkmate.backend.domain.order.OrderCreatedEvent;
import java.time.LocalDate;
import org.springframework.stereotype.Component;

@Component
public class MenuAnalysisContextFactory implements AnalysisContextFactory {

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        // 메뉴 도메인 전체 처리
        return DomainCategory.MENU == analysisCardCode.getMetricCode().getDomain();
    }

    @Override
    public AnalysisContext create(AnalysisCardCode analysisCardCode, OrderCreatedEvent event) {

        LocalDate today = LocalDate.now();

        return switch (analysisCardCode) {

                /*
                 * MNU_01 (메뉴별 매출 랭킹)
                 * */

            case MNU_01_01 -> // 오늘 메뉴별 매출 랭킹
                    new MenuAnalysisContext(
                            event.storeId(), analysisCardCode, today, today.plusDays(1));

            case MNU_01_04 -> // 최근 7일 매출 랭킹
                    new MenuAnalysisContext(
                            event.storeId(),
                            analysisCardCode,
                            today.minusDays(7),
                            today.plusDays(1));

            case MNU_01_05 -> // 최근 30일 매출 랭킹
                    new MenuAnalysisContext(
                            event.storeId(),
                            analysisCardCode,
                            today.minusDays(30),
                            today.plusDays(1));

                /*
                 * MNU_03 (시간대별 메뉴 주문건수)
                 * */

            case MNU_03_01 -> // 오늘 시간대별 주문
                    new MenuAnalysisContext(
                            event.storeId(), analysisCardCode, today, today.plusDays(1));

                /*
                 * MNU_04 (식자재 소진량)
                 * */

            case MNU_04_01 -> // 오늘 식재료 소진량
                    new MenuAnalysisContext(
                            event.storeId(), analysisCardCode, today, today.plusDays(1));

                /*
                 * MNU_05 (인기 메뉴 조합)
                 * */

            case MNU_05_04 -> // 최근 7일 인기 조합
                    new MenuAnalysisContext(
                            event.storeId(),
                            analysisCardCode,
                            today.minusDays(7),
                            today.plusDays(1));

            default -> null;
        };
    }
}
