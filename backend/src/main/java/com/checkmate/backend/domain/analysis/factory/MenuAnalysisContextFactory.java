package com.checkmate.backend.domain.analysis.factory;

import com.checkmate.backend.domain.analysis.context.AnalysisContext;
import com.checkmate.backend.domain.analysis.context.MenuAnalysisContext;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.DomainCategory;
import com.checkmate.backend.domain.order.OrderCreatedEvent;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
        LocalDateTime anchor = event.anchor();
        LocalDate today = anchor.toLocalDate();

        return switch (analysisCardCode) {

                /*
                 * MNU_01_01 (오늘 메뉴별 매출 랭킹)
                 * MNU_02_01 (오늘 카테고리별 매출 랭킹)
                 * MNU_03_01 (오늘 시간대별 메뉴 주문건수)
                 * MNU_04_01 (오늘 식재료 소진량)
                 * */

            case MNU_01_01, MNU_02_01, MNU_03_01, MNU_04_01 ->
                    new MenuAnalysisContext(
                            event.storeId(), anchor, analysisCardCode, today, today.plusDays(1));

                /*
                 * MNU_01_04 (최근 7일 메뉴별 매출 랭킹)
                 * MNU_02_02 (최근 7일 카테고리별 매출 랭킹)
                 * MNU_03_02 (최근 7일 시간대별 메뉴 주문건수)
                 * MNU_05_04 (최근 인기 메뉴 조합)
                 * */

            case MNU_01_04, MNU_02_02, MNU_03_02, MNU_05_04 ->
                    new MenuAnalysisContext(
                            event.storeId(),
                            anchor,
                            analysisCardCode,
                            today.minusDays(7),
                            today.plusDays(1));

                /*
                 * MNU_01_05 (최근 30일 메뉴별 매출 랭킹)
                 * MNU_02_03 (최근 30일 카테고리별 매출 랭킹)
                 * MNU_03_03 (최근 30일 시간대별 메뉴 주문건수)
                 * */

            case MNU_01_05, MNU_02_03, MNU_03_03 ->
                    new MenuAnalysisContext(
                            event.storeId(),
                            anchor,
                            analysisCardCode,
                            today.minusDays(30),
                            today.plusDays(1));

                /*
                 * MNU_05_05 (최근 14일 인기 메뉴 조합)
                 * */

            case MNU_05_05 -> // 최근 14일 인기 조합
                    new MenuAnalysisContext(
                            event.storeId(),
                            anchor,
                            analysisCardCode,
                            today.minusDays(14),
                            today.plusDays(1));

            default -> null;
        };
    }

    @Override
    public AnalysisContext create(
            AnalysisCardCode analysisCardCode, Long storeId, LocalDate start, LocalDate end) {
        return new MenuAnalysisContext(storeId, LocalDateTime.now(), analysisCardCode, start, end);
    }
}
