package com.checkmate.backend.domain.analysis.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AnalysisCardCode {

    /*
     * 카드 사이즈가 null 인 경우는 실제 지표 카드가 아님. 편의상으로 구현되어 있는 것
     * */

    // 매출 - 현황 > 실매출
    SLS_01_01(
            "오늘 실매출",
            AnalysisCode.SLS_01,
            Period.TODAY,
            ComparePeriod.LAST_WEEK_SAME_DAY,
            CardSize.SIZE_1X1),
    SLS_01_02(
            "이번주 실매출",
            AnalysisCode.SLS_01,
            Period.THIS_WEEK,
            ComparePeriod.LAST_WEEK,
            CardSize.SIZE_1X1),
    SLS_01_03(
            "이번달 실매출",
            AnalysisCode.SLS_01,
            Period.THIS_MONTH,
            ComparePeriod.LAST_MONTH,
            CardSize.SIZE_1X1),

    // 매출 - 현황 > 주문건수
    SLS_02_01(
            "오늘 주문건수",
            AnalysisCode.SLS_02,
            Period.TODAY,
            ComparePeriod.LAST_WEEK_SAME_DAY,
            CardSize.SIZE_1X1),
    SLS_02_02(
            "이번주 주문건수",
            AnalysisCode.SLS_02,
            Period.THIS_WEEK,
            ComparePeriod.LAST_WEEK,
            CardSize.SIZE_1X1),
    SLS_02_03(
            "이번달 주문건수",
            AnalysisCode.SLS_02,
            Period.THIS_MONTH,
            ComparePeriod.LAST_MONTH,
            CardSize.SIZE_1X1),

    // 매출 - 현황 > 건당 평균가
    SLS_03_01(
            "오늘 건당 평균가",
            AnalysisCode.SLS_03,
            Period.TODAY,
            ComparePeriod.LAST_WEEK_SAME_DAY,
            CardSize.SIZE_1X1),
    SLS_03_02(
            "이번주 건당 평균가",
            AnalysisCode.SLS_03,
            Period.THIS_WEEK,
            ComparePeriod.LAST_WEEK,
            CardSize.SIZE_1X1),
    SLS_03_03(
            "이번달 건당 평균가",
            AnalysisCode.SLS_03,
            Period.THIS_MONTH,
            ComparePeriod.LAST_MONTH,
            CardSize.SIZE_1X1),

    // 매출 - 현황 > 총매출
    SLS_04_01("오늘 총매출", AnalysisCode.SLS_04, Period.TODAY, ComparePeriod.NONE, null),
    SLS_04_02("이번주 총매출", AnalysisCode.SLS_04, Period.THIS_WEEK, ComparePeriod.NONE, null),
    SLS_04_03("이번달 총매출", AnalysisCode.SLS_04, Period.THIS_MONTH, ComparePeriod.NONE, null),

    // 매출 - 현황 > 할인 & 취소
    SLS_05_01("오늘 할인 & 취소", AnalysisCode.SLS_05, Period.TODAY, ComparePeriod.NONE, null),
    SLS_05_02("이번주 할인 & 취소", AnalysisCode.SLS_05, Period.THIS_WEEK, ComparePeriod.NONE, null),
    SLS_05_03("이번달 할인 & 취소", AnalysisCode.SLS_05, Period.THIS_MONTH, ComparePeriod.NONE, null),

    // 매출 - 유입 구조 > 판매유형별
    SLS_06_01(
            "오늘 판매유형별 매출",
            AnalysisCode.SLS_06,
            Period.TODAY,
            ComparePeriod.LAST_7_DAYS_AVG,
            CardSize.SIZE_1X2),
    SLS_06_02(
            "이번주 판매유형별 매출",
            AnalysisCode.SLS_06,
            Period.THIS_WEEK,
            ComparePeriod.NONE,
            CardSize.SIZE_1X2),
    SLS_06_03(
            "이번달 판매유형별 매출",
            AnalysisCode.SLS_06,
            Period.THIS_MONTH,
            ComparePeriod.NONE,
            CardSize.SIZE_1X2),

    // 매출 - 유입 구조 > 주문수단별
    SLS_07_01(
            "오늘 주문수단별 매출",
            AnalysisCode.SLS_07,
            Period.TODAY,
            ComparePeriod.LAST_7_DAYS_AVG,
            CardSize.SIZE_1X2),
    SLS_07_02(
            "이번주 주문수단별 매출",
            AnalysisCode.SLS_07,
            Period.THIS_WEEK,
            ComparePeriod.NONE,
            CardSize.SIZE_1X2),
    SLS_07_03(
            "이번달 주문수단별 매출",
            AnalysisCode.SLS_07,
            Period.THIS_MONTH,
            ComparePeriod.NONE,
            CardSize.SIZE_1X2),

    // 매출 - 유입 구조 > 결제수단별
    SLS_08_01(
            "오늘 결제수단별 매출",
            AnalysisCode.SLS_08,
            Period.TODAY,
            ComparePeriod.LAST_7_DAYS_AVG,
            CardSize.SIZE_1X2),
    SLS_08_02(
            "이번주 결제수단별 매출",
            AnalysisCode.SLS_08,
            Period.THIS_WEEK,
            ComparePeriod.NONE,
            CardSize.SIZE_1X2),
    SLS_08_03(
            "이번달 결제수단별 매출",
            AnalysisCode.SLS_08,
            Period.THIS_MONTH,
            ComparePeriod.NONE,
            CardSize.SIZE_1X2),

    // 매출 - 추이
    SLS_09_04(
            "일별 매출 추이",
            AnalysisCode.SLS_09,
            Period.LAST_7_DAYS,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),
    SLS_10_07(
            "주별 매출 추이",
            AnalysisCode.SLS_10,
            Period.LAST_8_WEEKS,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),
    SLS_11_07(
            "월별 매출 추이",
            AnalysisCode.SLS_11,
            Period.LAST_6_MONTHS,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),

    // 매출 - 패턴
    SLS_13_01(
            "피크타임",
            AnalysisCode.SLS_13,
            Period.TODAY,
            ComparePeriod.LAST_4_WEEKS_SAME_DAY_AVG,
            CardSize.SIZE_1X1),
    SLS_14_06(
            "요일별 매출 패턴",
            AnalysisCode.SLS_14,
            Period.LAST_4_WEEKS,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),

    // 메뉴 > 메뉴 랭킹
    MNU_01_01(
            "오늘 메뉴별 매출 랭킹",
            AnalysisCode.MNU_01,
            Period.TODAY,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),
    MNU_01_04(
            "최근 7일 메뉴별 매출 랭킹",
            AnalysisCode.MNU_01,
            Period.LAST_7_DAYS,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),
    MNU_01_05(
            "최근 30일 메뉴별 매출 랭킹",
            AnalysisCode.MNU_01,
            Period.LAST_30_DAYS,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),

    // 메뉴 > 카테고리별 매출
    MNU_02_01("오늘 카테고리별 매출 랭킹", AnalysisCode.MNU_02, Period.TODAY, ComparePeriod.NONE, null),
    MNU_02_02(
            "최근 7일 카테고리별 매출 랭킹", AnalysisCode.MNU_02, Period.LAST_7_DAYS, ComparePeriod.NONE, null),
    MNU_02_03(
            "최근 30일 카테고리별 매출 랭킹",
            AnalysisCode.MNU_02,
            Period.LAST_30_DAYS,
            ComparePeriod.NONE,
            null),

    // 메뉴 > 시간대별 주문
    MNU_03_01(
            "오늘 시간대별 메뉴 주문건수",
            AnalysisCode.MNU_03,
            Period.TODAY,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),
    MNU_03_02(
            "최근 7일 시간대별 메뉴 주문건수",
            AnalysisCode.MNU_03,
            Period.LAST_7_DAYS,
            ComparePeriod.NONE,
            null),
    MNU_03_03(
            "최근 30일 시간대별 메뉴 주문건수",
            AnalysisCode.MNU_03,
            Period.LAST_30_DAYS,
            ComparePeriod.NONE,
            null),

    // 메뉴 > 식재료
    MNU_04_01(
            "오늘 식재료 소진량", AnalysisCode.MNU_04, Period.TODAY, ComparePeriod.NONE, CardSize.SIZE_1X1),

    // 메뉴 > 인기 조합
    MNU_05_04(
            "최근 인기 메뉴 조합",
            AnalysisCode.MNU_05,
            Period.LAST_7_DAYS,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),
    MNU_05_05(
            "최근 14일 인기 메뉴 조합", AnalysisCode.MNU_05, Period.LAST_14_DAYS, ComparePeriod.NONE, null),

    // 날씨
    WTH_01_01("오늘 날씨 예보", AnalysisCode.WTH_01, Period.TODAY, ComparePeriod.NONE, CardSize.SIZE_1X1),
    WTH_02_01(
            "오늘 시간별 예보", AnalysisCode.WTH_02, Period.TODAY, ComparePeriod.NONE, CardSize.SIZE_2X1),
    WTH_03_04(
            "주간 날씨 예보",
            AnalysisCode.WTH_03,
            Period.LAST_7_DAYS,
            ComparePeriod.NONE,
            CardSize.SIZE_3X1),

    // 날씨 > 강수 인사이트
    WTH_04_07(
            "강수 인사이트",
            AnalysisCode.WTH_04,
            Period.LAST_365_DAYS,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),

    // 날씨 > 강수별 주문 비율
    WTH_05_07(
            "비강수일 vs 강수일 판매채널별 주문건수 비율 비교",
            AnalysisCode.WTH_05,
            Period.LAST_365_DAYS,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),

    // 날씨 > 강수별 매출 변화
    WTH_06_07(
            "비강수일 vs 강수일 평균 주문수 및 매출 비교",
            AnalysisCode.WTH_06,
            Period.LAST_365_DAYS,
            ComparePeriod.NONE,
            CardSize.SIZE_1X1),

    // 날씨 > 기온별 매출 분석
    WTH_07_01("날씨 분석 (기온별)", AnalysisCode.WTH_07, Period.LAST_365_DAYS, ComparePeriod.NONE, null);

    private final String title;
    private final AnalysisCode metricCode;
    private final Period period;
    private final ComparePeriod comparePeriod;
    private final CardSize cardSize;
}
