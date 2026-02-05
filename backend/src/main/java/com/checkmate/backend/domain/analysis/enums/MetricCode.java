package com.checkmate.backend.domain.analysis.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MetricCode {

    /** [매출 - 현황] */
    SLS_01(
            "실매출 현황",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.NONE,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.METRIC_CARD,
            ChartType.NONE,
            PeriodType.FIXED,
            true),

    SLS_02(
            "주문건수 현황",
            DomainCategory.SALES,
            DataType.COUNT,
            DataType.NONE,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.METRIC_CARD,
            ChartType.NONE,
            PeriodType.FIXED,
            true),

    SLS_03(
            "건당 평균가",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.NONE,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.METRIC_CARD,
            ChartType.NONE,
            PeriodType.FIXED,
            true),

    SLS_04(
            "총매출 현황",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.COUNT,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.METRIC_CARD,
            ChartType.NONE,
            PeriodType.FIXED,
            false),

    SLS_05(
            "할인 및 취소",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.COUNT,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.METRIC_CARD,
            ChartType.NONE,
            PeriodType.FIXED,
            false),

    /** [매출 - 유입 구조] */
    SLS_06(
            "판매유형별 매출",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.COUNT,
            XAxisType.SALES_TYPE,
            XAxisType.NONE,
            ChartType.DONUT,
            ChartType.NONE,
            PeriodType.MIXED,
            true),

    SLS_07(
            "주문수단별 매출",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.COUNT,
            XAxisType.ORDER_METHOD,
            XAxisType.NONE,
            ChartType.DONUT,
            ChartType.NONE,
            PeriodType.MIXED,
            true),

    SLS_08(
            "결제수단별 매출",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.COUNT,
            XAxisType.PAYMENT_METHOD,
            XAxisType.NONE,
            ChartType.DONUT,
            ChartType.NONE,
            PeriodType.MIXED,
            true),

    /** [매출 - 추이] */
    SLS_09(
            "일별 매출 추이",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.COUNT,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.BAR,
            ChartType.LINE,
            PeriodType.ROLLING,
            false),

    SLS_10(
            "주별 매출 추이",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.COUNT,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.BAR,
            ChartType.LINE,
            PeriodType.ROLLING,
            false),

    SLS_11(
            "월별 매출 추이",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.COUNT,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.BAR,
            ChartType.LINE,
            PeriodType.FIXED,
            false),

    SLS_12(
            "연별 매출 추이",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.COUNT,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.BAR,
            ChartType.NONE,
            PeriodType.FIXED,
            false),

    /** [매출 - 패턴] */
    SLS_13(
            "피크타임 분석",
            DomainCategory.SALES,
            DataType.COUNT,
            DataType.MONEY,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.LINE,
            ChartType.NONE,
            PeriodType.FIXED,
            true),

    SLS_14(
            "요일별 매출 패턴",
            DomainCategory.SALES,
            DataType.MONEY,
            DataType.COUNT,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.BAR,
            ChartType.NONE,
            PeriodType.ROLLING,
            false),

    /** [메뉴] */
    MNU_01(
            "메뉴별 매출 랭킹",
            DomainCategory.MENU,
            DataType.MONEY,
            DataType.COUNT,
            XAxisType.MENU,
            XAxisType.NONE,
            ChartType.RANKING,
            ChartType.NONE,
            PeriodType.MIXED,
            false),

    MNU_02(
            "카테고리별 매출",
            DomainCategory.MENU,
            DataType.MONEY,
            DataType.NONE,
            XAxisType.CATEGORY,
            XAxisType.NONE,
            ChartType.DONUT,
            ChartType.NONE,
            PeriodType.ROLLING,
            false),

    MNU_03(
            "시간대별 메뉴 주문",
            DomainCategory.MENU,
            DataType.COUNT,
            DataType.NONE,
            XAxisType.TIME,
            XAxisType.MENU,
            ChartType.STACKED_BAR,
            ChartType.NONE,
            PeriodType.MIXED,
            false),

    MNU_04(
            "식재료 소진량",
            DomainCategory.MENU,
            DataType.VOLUME,
            DataType.NONE,
            XAxisType.INGREDIENT,
            XAxisType.UNIT,
            ChartType.RANKING,
            ChartType.NONE,
            PeriodType.FIXED,
            false),

    MNU_05(
            "인기 메뉴 조합",
            DomainCategory.MENU,
            DataType.COUNT,
            DataType.MONEY,
            XAxisType.MENU,
            XAxisType.NONE,
            ChartType.RANKING,
            ChartType.NONE,
            PeriodType.ROLLING,
            false),

    /** [날씨] */
    WTH_01(
            "오늘 날씨 예보",
            DomainCategory.WEATHER,
            DataType.NONE,
            DataType.NONE,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.METRIC_CARD,
            ChartType.NONE,
            PeriodType.FIXED,
            false),

    WTH_02(
            "오늘 시간별 예보",
            DomainCategory.WEATHER,
            DataType.TEMP,
            DataType.NONE,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.METRIC_CARD,
            ChartType.LINE,
            PeriodType.FIXED,
            false),

    WTH_03(
            "주간 날씨 예보",
            DomainCategory.WEATHER,
            DataType.TEMP,
            DataType.NONE,
            XAxisType.TIME,
            XAxisType.NONE,
            ChartType.METRIC_CARD,
            ChartType.NONE,
            PeriodType.FIXED,
            false),

    WTH_04(
            "강수 인사이트",
            DomainCategory.WEATHER,
            DataType.PERCENT,
            DataType.NONE,
            XAxisType.WEATHER,
            XAxisType.NONE,
            ChartType.METRIC_CARD,
            ChartType.NONE,
            PeriodType.FIXED,
            true),

    WTH_05(
            "강수별 주문 비율",
            DomainCategory.WEATHER,
            DataType.PERCENT,
            DataType.NONE,
            XAxisType.WEATHER,
            XAxisType.NONE,
            ChartType.BAR,
            ChartType.NONE,
            PeriodType.FIXED,
            true),

    WTH_06(
            "강수별 매출 변화",
            DomainCategory.WEATHER,
            DataType.PERCENT,
            DataType.NONE,
            XAxisType.WEATHER,
            XAxisType.NONE,
            ChartType.METRIC_CARD,
            ChartType.NONE,
            PeriodType.FIXED,
            true),

    WTH_07(
            "기온별 매출 분석",
            DomainCategory.WEATHER,
            DataType.COUNT,
            DataType.MONEY,
            XAxisType.TEMPERATURE,
            XAxisType.NONE,
            ChartType.BAR,
            ChartType.NONE,
            PeriodType.FIXED,
            true);

    // 지표 설명
    private final String description;

    // 도메인 분류
    private final DomainCategory domain;

    // Y축 데이터 타입 (메인)
    private final DataType yAxisMain;

    // Y축 데이터 타입 (서브)
    private final DataType yAxisSub;

    // X축 타입 (메인)
    private final XAxisType xAxisTypeMain;

    // X축 타입 (서브)
    private final XAxisType xAxisTypeSub;

    // 메인 차트 타입
    private final ChartType mainChartType;

    // 서브 차트 타입
    private final ChartType subChartType;

    // 기간 타입 (고정/롤링/혼합)
    private final PeriodType periodType;

    // 비교 가능 여부
    private final boolean isComparable;
}
