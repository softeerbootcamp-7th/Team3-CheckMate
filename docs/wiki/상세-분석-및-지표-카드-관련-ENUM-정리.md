# 상세 분석 및 지표 카드 관련 ENUM 정리

> 참여자: 정한울

## 1️⃣ 매출 - 현황

| 코드 | 제목 | 분석 코드 | 기간 | 비교 | 카드 사이즈 |
| --- | --- | --- | --- | --- | --- |
| SLS_01_01 | 오늘 실매출 | SLS_01 | TODAY | LAST_WEEK_SAME_DAY | 1x1 |
| SLS_01_02 | 이번주 실매출 | SLS_01 | THIS_WEEK | LAST_WEEK | 1x1 |
| SLS_01_03 | 이번달 실매출 | SLS_01 | THIS_MONTH | LAST_MONTH | 1x1 |
| SLS_02_01 | 오늘 주문건수 | SLS_02 | TODAY | LAST_WEEK_SAME_DAY | 1x1 |
| SLS_02_02 | 이번주 주문건수 | SLS_02 | THIS_WEEK | LAST_WEEK | 1x1 |
| SLS_02_03 | 이번달 주문건수 | SLS_02 | THIS_MONTH | LAST_MONTH | 1x1 |
| SLS_03_01 | 오늘 건당 평균가 | SLS_03 | TODAY | LAST_WEEK_SAME_DAY | 1x1 |
| SLS_03_02 | 이번주 건당 평균가 | SLS_03 | THIS_WEEK | LAST_WEEK | 1x1 |
| SLS_03_03 | 이번달 건당 평균가 | SLS_03 | THIS_MONTH | LAST_MONTH | 1x1 |
| SLS_04_01 | 오늘 총매출 | SLS_04 | TODAY | NONE | null |
| SLS_04_02 | 이번주 총매출 | SLS_04 | THIS_WEEK | NONE | null |
| SLS_04_03 | 이번달 총매출 | SLS_04 | THIS_MONTH | NONE | null |
| SLS_05_01 | 오늘 할인 & 취소 | SLS_05 | TODAY | NONE | null |
| SLS_05_02 | 이번주 할인 & 취소 | SLS_05 | THIS_WEEK | NONE | null |
| SLS_05_03 | 이번달 할인 & 취소 | SLS_05 | THIS_MONTH | NONE | null |

## 2️⃣ 매출 - 유입 구조

| 코드 | 제목 | 분석 코드 | 기간 | 비교 | 카드 사이즈 |
| --- | --- | --- | --- | --- | --- |
| SLS_06_01 | 오늘 판매유형별 매출 | SLS_06 | TODAY | LAST_7_DAYS_AVG | 1x2 |
| SLS_06_02 | 이번주 판매유형별 매출 | SLS_06 | THIS_WEEK | NONE | 1x2 |
| SLS_06_03 | 이번달 판매유형별 매출 | SLS_06 | THIS_MONTH | NONE | 1x2 |
| SLS_07_01 | 오늘 주문수단별 매출 | SLS_07 | TODAY | LAST_7_DAYS_AVG | 1x2 |
| SLS_07_02 | 이번주 주문수단별 매출 | SLS_07 | THIS_WEEK | NONE | 1x2 |
| SLS_07_03 | 이번달 주문수단별 매출 | SLS_07 | THIS_MONTH | NONE | 1x2 |
| SLS_08_01 | 오늘 결제수단별 매출 | SLS_08 | TODAY | LAST_7_DAYS_AVG | 1x2 |
| SLS_08_02 | 이번주 결제수단별 매출 | SLS_08 | THIS_WEEK | NONE | 1x2 |
| SLS_08_03 | 이번달 결제수단별 매출 | SLS_08 | THIS_MONTH | NONE | 1x2 |

---

## 3️⃣ 매출 - 추이

| 코드 | 제목 | 분석 코드 | 기간 | 비교 | 카드 사이즈 |
| --- | --- | --- | --- | --- | --- |
| SLS_09_04 | 일별 매출 추이 (최근 7일) | SLS_09 | LAST_7_DAYS | NONE | 3x1 |
| SLS_09_05 | 일별 매출 추이 (최근 14일) | SLS_09 | LAST_14_DAYS | NONE | null |
| SLS_09_06 | 일별 매출 추이 (최근 30일) | SLS_09 | LAST_30_DAYS | NONE | null |
| SLS_10_07 | 주별 매출 추이 (최근 8주) | SLS_10 | LAST_8_WEEKS | NONE | 3x1 |
| SLS_10_08 | 주별 매출 추이 (최근 12주) | SLS_10 | LAST_12_WEEKS | NONE | null |
| SLS_11_07 | 월별 매출 추이 (최근 6개월) | SLS_11 | LAST_6_MONTHS | NONE | 3x1 |
| SLS_11_08 | 월별 매출 추이 (최근 12개월) | SLS_11 | LAST_12_MONTHS | NONE | null |
| SLS_12_01 | 연별 매출 추이 | SLS_12 | LAST_3_YEARS | NONE | null |

---

## 4️⃣ 매출 - 패턴

| 코드 | 제목 | 분석 코드 | 기간 | 비교 | 카드 사이즈 |
| --- | --- | --- | --- | --- | --- |
| SLS_13_01 | 피크타임 | SLS_13 | TODAY | LAST_4_WEEKS_SAME_DAY_AVG | 1x1 |
| SLS_14_06 | 요일별 매출 패턴 | SLS_14 | LAST_4_WEEKS | NONE | 1x1 |

---

## 5️⃣ 메뉴 > 메뉴 랭킹

| 코드 | 제목 | 분석 코드 | 기간 | 비교 | 카드 사이즈 |
| --- | --- | --- | --- | --- | --- |
| MNU_01_01 | 오늘 메뉴별 매출 랭킹 | MNU_01 | TODAY | NONE | 1x1 |
| MNU_01_04 | 최근 7일 메뉴별 매출 랭킹 | MNU_01 | LAST_7_DAYS | NONE | 1x1 |
| MNU_01_05 | 최근 30일 메뉴별 매출 랭킹 | MNU_01 | LAST_30_DAYS | NONE | 1x1 |

---

## 6️⃣ 메뉴 > 카테고리별 매출

| 코드 | 제목 | 분석 코드 | 기간 | 비교 | 카드 사이즈 |
| --- | --- | --- | --- | --- | --- |
| MNU_02_01 | 오늘 카테고리별 매출 랭킹 | MNU_02 | TODAY | NONE | null |
| MNU_02_02 | 최근 7일 카테고리별 매출 랭킹 | MNU_02 | LAST_7_DAYS | NONE | null |
| MNU_02_03 | 최근 30일 카테고리별 매출 랭킹 | MNU_02 | LAST_30_DAYS | NONE | null |

---

## 7️⃣ 메뉴 > 시간대별 주문

| 코드 | 제목 | 분석 코드 | 기간 | 비교 | 카드 사이즈 |
| --- | --- | --- | --- | --- | --- |
| MNU_03_01 | 오늘 시간대별 메뉴 주문건수 | MNU_03 | TODAY | NONE | 1x1 |
| MNU_03_02 | 최근 7일 시간대별 메뉴 주문건수 | MNU_03 | LAST_7_DAYS | NONE | null |
| MNU_03_03 | 최근 30일 시간대별 메뉴 주문건수 | MNU_03 | LAST_30_DAYS | NONE | null |

---

## 8️⃣ 메뉴 > 식재료

| 코드 | 제목 | 분석 코드 | 기간 | 비교 | 카드 사이즈 |
| --- | --- | --- | --- | --- | --- |
| MNU_04_01 | 오늘 식재료 소진량 | MNU_04 | TODAY | NONE | 1x1 |

---

## 9️⃣ 메뉴 > 인기 메뉴 조합

| 코드 | 제목 | 분석 코드 | 기간 | 비교 | 카드 사이즈 |
| --- | --- | --- | --- | --- | --- |
| MNU_05_04 | 최근 인기 메뉴 조합 | MNU_05 | LAST_7_DAYS | NONE | 1x1 |
| MNU_05_05 | 최근 14일 인기 메뉴 조합 | MNU_05 | LAST_14_DAYS | NONE | null |

## 1. 지표 카드 JSON 예시

```json
{
  // [식별자] 카드 고유 코드 (AnalysisCardCode Enum)
  // -> 리액트 키(key)나 특정 카드 로직 분기 처리에 사용
  "cardId": "SLS_09_04",

  // [표시 정보] 카드 헤더에 들어갈 제목 및 설명
  "title": "일별 매출 추이",
  "description": "일별 매출 추이 및 변화량", // AnalysisCode의 description

  // [도메인] 탭 구분용 (SALES: 매출, MENU: 메뉴, WEATHER: 날씨)
  "domain": "SALES",

  // [데이터 요청 명세] 실제 차트 데이터를 로딩할 때 보낼 파라미터
  "queryConfig": {
    "metricCode": "SLS_09",       // 분석 지표 코드
    "period": "LAST_7_DAYS",      // 기본 조회 기간 (Period Enum)
    "comparePeriod": "NONE"       // 비교 기간 설정 (ComparePeriod Enum)
  },

  // [UI 렌더링 명세] 차트 컴포넌트 결정 및 옵션 설정
  "uiConfig": {
    // 1. 차트 타입 (메인/서브)
    "chartType": "BAR",           // 메인: 막대 그래프
    "subChartType": "LINE",       // 서브: 꺾은선 그래프 (이중축 등 사용 시)

    // 2. 데이터 포맷팅 (단위)
    "unitType": "MONEY",          // 메인 축 단위: 원 (₩)
    "subUnitType": "COUNT",       // 서브 축 단위: 건

    // 3. 축 설정
    "xAxisType": "TIME",          // X축 기준: 시간 (날짜/시간)
    
    // 4. 기간 제어 타입 (PeriodType)
    // -> FIXED: 고정 기간 (오늘, 이번달 등) -> 캘린더 비활성화 또는 단순 표시
    // -> ROLLING: 롤링 (최근 7일, 최근 30일) -> 상대적 기간
    // -> MIXED: 복합 -> 상황에 따라 다름
    "periodType": "ROLLING",

    // 5. 비교 기능 활성화 여부
    // -> true면 UI에 '전기간 대비' 같은 토글이나 뱃지 표시
    "isComparable": false
  }
}
```

## 2. 다양한 케이스별 JSON 예시

### Case A. 고정 기간 + 매트릭 카드 (예: 오늘 실매출)

> `FIXED` 타입이므로 캘린더 조작보다는 '오늘'이라는 시점이 강조됩니다.
> 

```json
{
  "cardId": "SLS_01_01",
  "title": "오늘 실매출",
  "domain": "SALES",
  "queryConfig": {
    "metricCode": "SLS_01",
    "period": "TODAY",
    "comparePeriod": "LAST_WEEK_SAME_DAY"
  },
  "uiConfig": {
    "chartType": "METRIC_CARD",   // 숫자만 크게 표시
    "subChartType": "NONE",
    "unitType": "MONEY",          // 금액 포맷팅 (1,000,000원)
    "subUnitType": "NONE",
    "xAxisType": "TIME",
    "periodType": "FIXED",        // [기간타입] 고정됨
    "isComparable": true          // [비교여부] 증감률 표시 가능 (vs 지난주)
  }
}
```

### Case B. 롤링 기간 + 복합 차트 (예: 일별 매출 추이)

> `ROLLING` 타입이므로 '최근 7일', '최근 30일' 등으로 기간이 유동적입니다.
> 

```json
{
  "cardId": "SLS_09_04",
  "title": "일별 매출 추이",
  "domain": "SALES",
  "queryConfig": {
    "metricCode": "SLS_09",
    "period": "LAST_7_DAYS",
    "comparePeriod": "NONE"
  },
  "uiConfig": {
    "chartType": "BAR",           // 막대 그래프
    "subChartType": "LINE",       // 꺾은선 그래프 (같이 그림)
    "unitType": "MONEY",
    "subUnitType": "COUNT",
    "xAxisType": "TIME",
    "periodType": "ROLLING",      // [기간타입] 롤링 기간
    "isComparable": false
  }
```

### Case C. 혼합 기간 + 도넛 차트 (예: 판매유형별 매출)

> `MIXED` 타입은 특정 기간(오늘)과 통계적 기간(평균)이 섞여 있을 수 있습니다.
> 

```json
{
  "cardId": "SLS_06_01",
  "title": "오늘 판매유형별 매출",
  "domain": "SALES",
  "queryConfig": {
    "metricCode": "SLS_06",
    "period": "TODAY",
    "comparePeriod": "LAST_7_DAYS_AVG"
  },
  "uiConfig": {
    "chartType": "DONUT",         // 도넛 차트
    "subChartType": "NONE",
    "unitType": "MONEY",
    "subUnitType": "COUNT",
    "xAxisType": "SALES_TYPE",    // X축이 시간이 아닌 '판매유형'
    "periodType": "MIXED",        // [기간타입] 혼합
    "isComparable": true
  }
}
```

## 3. 지표 카드 전체

<aside>
❗

만들어 놓은 Enum 클래스들 AI한테 주고 json으로 뱉으라고 한 거임.

정책서와 대조하여 팩트체크 반드시 필요.

</aside>

```json
[
  {
    "cardId": "SLS_01_01",
    "title": "오늘 실매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_01",
      "period": "TODAY",
      "comparePeriod": "LAST_WEEK_SAME_DAY"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "실매출 현황"
  },
  {
    "cardId": "SLS_01_02",
    "title": "이번주 실매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_01",
      "period": "THIS_WEEK",
      "comparePeriod": "LAST_WEEK"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "실매출 현황"
  },
  {
    "cardId": "SLS_01_03",
    "title": "이번달 실매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_01",
      "period": "THIS_MONTH",
      "comparePeriod": "LAST_MONTH"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "실매출 현황"
  },
  {
    "cardId": "SLS_02_01",
    "title": "오늘 주문건수",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_02",
      "period": "TODAY",
      "comparePeriod": "LAST_WEEK_SAME_DAY"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "주문건수 현황"
  },
  {
    "cardId": "SLS_02_02",
    "title": "이번주 주문건수",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_02",
      "period": "THIS_WEEK",
      "comparePeriod": "LAST_WEEK"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "주문건수 현황"
  },
  {
    "cardId": "SLS_02_03",
    "title": "이번달 주문건수",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_02",
      "period": "THIS_MONTH",
      "comparePeriod": "LAST_MONTH"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "주문건수 현황"
  },
  {
    "cardId": "SLS_03_01",
    "title": "오늘 건당 평균가",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_03",
      "period": "TODAY",
      "comparePeriod": "LAST_WEEK_SAME_DAY"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "건당 평균가"
  },
  {
    "cardId": "SLS_03_02",
    "title": "이번주 건당 평균가",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_03",
      "period": "THIS_WEEK",
      "comparePeriod": "LAST_WEEK"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "건당 평균가"
  },
  {
    "cardId": "SLS_03_03",
    "title": "이번달 건당 평균가",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_03",
      "period": "THIS_MONTH",
      "comparePeriod": "LAST_MONTH"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "건당 평균가"
  },
  {
    "cardId": "SLS_04_01",
    "title": "오늘 총매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_04",
      "period": "TODAY",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": false
    },
    "description": "총매출 현황"
  },
  {
    "cardId": "SLS_04_02",
    "title": "이번주 총매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_04",
      "period": "THIS_WEEK",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": false
    },
    "description": "총매출 현황"
  },
  {
    "cardId": "SLS_04_03",
    "title": "이번달 총매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_04",
      "period": "THIS_MONTH",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": false
    },
    "description": "총매출 현황"
  },
  {
    "cardId": "SLS_05_01",
    "title": "오늘 할인 & 취소",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_05",
      "period": "TODAY",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": false
    },
    "description": "할인 및 취소"
  },
  {
    "cardId": "SLS_05_02",
    "title": "이번주 할인 & 취소",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_05",
      "period": "THIS_WEEK",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": false
    },
    "description": "할인 및 취소"
  },
  {
    "cardId": "SLS_05_03",
    "title": "이번달 할인 & 취소",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_05",
      "period": "THIS_MONTH",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": false
    },
    "description": "할인 및 취소"
  },
  {
    "cardId": "SLS_06_01",
    "title": "오늘 판매유형별 매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_06",
      "period": "TODAY",
      "comparePeriod": "LAST_7_DAYS_AVG"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "SALES_TYPE",
      "periodType": "MIXED",
      "isComparable": true
    },
    "description": "판매유형별 매출"
  },
  {
    "cardId": "SLS_06_02",
    "title": "이번주 판매유형별 매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_06",
      "period": "THIS_WEEK",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "SALES_TYPE",
      "periodType": "MIXED",
      "isComparable": true
    },
    "description": "판매유형별 매출"
  },
  {
    "cardId": "SLS_06_03",
    "title": "이번달 판매유형별 매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_06",
      "period": "THIS_MONTH",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "SALES_TYPE",
      "periodType": "MIXED",
      "isComparable": true
    },
    "description": "판매유형별 매출"
  },
  {
    "cardId": "SLS_07_01",
    "title": "오늘 주문수단별 매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_07",
      "period": "TODAY",
      "comparePeriod": "LAST_7_DAYS_AVG"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "ORDER_METHOD",
      "periodType": "MIXED",
      "isComparable": true
    },
    "description": "주문수단별 매출"
  },
  {
    "cardId": "SLS_07_02",
    "title": "이번주 주문수단별 매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_07",
      "period": "THIS_WEEK",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "ORDER_METHOD",
      "periodType": "MIXED",
      "isComparable": true
    },
    "description": "주문수단별 매출"
  },
  {
    "cardId": "SLS_07_03",
    "title": "이번달 주문수단별 매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_07",
      "period": "THIS_MONTH",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "ORDER_METHOD",
      "periodType": "MIXED",
      "isComparable": true
    },
    "description": "주문수단별 매출"
  },
  {
    "cardId": "SLS_08_01",
    "title": "오늘 결제수단별 매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_08",
      "period": "TODAY",
      "comparePeriod": "LAST_7_DAYS_AVG"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "PAYMENT_METHOD",
      "periodType": "MIXED",
      "isComparable": true
    },
    "description": "결제수단별 매출"
  },
  {
    "cardId": "SLS_08_02",
    "title": "이번주 결제수단별 매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_08",
      "period": "THIS_WEEK",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "PAYMENT_METHOD",
      "periodType": "MIXED",
      "isComparable": true
    },
    "description": "결제수단별 매출"
  },
  {
    "cardId": "SLS_08_03",
    "title": "이번달 결제수단별 매출",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_08",
      "period": "THIS_MONTH",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "PAYMENT_METHOD",
      "periodType": "MIXED",
      "isComparable": true
    },
    "description": "결제수단별 매출"
  },
  {
    "cardId": "SLS_09_04",
    "title": "일별 매출 추이",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_09",
      "period": "LAST_7_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "LINE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "periodType": "ROLLING",
      "isComparable": false
    },
    "description": "일별 매출 추이"
  },
  {
    "cardId": "SLS_10_07",
    "title": "주별 매출 추이",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_10",
      "period": "LAST_8_WEEKS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "LINE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "periodType": "ROLLING",
      "isComparable": false
    },
    "description": "주별 매출 추이"
  },
  {
    "cardId": "SLS_11_07",
    "title": "월별 매출 추이",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_11",
      "period": "LAST_6_MONTHS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "LINE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": false
    },
    "description": "월별 매출 추이"
  },
  {
    "cardId": "SLS_13_01",
    "title": "피크타임",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_13",
      "period": "TODAY",
      "comparePeriod": "LAST_4_WEEKS_SAME_DAY_AVG"
    },
    "uiConfig": {
      "chartType": "LINE",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "MONEY",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "피크타임 분석"
  },
  {
    "cardId": "SLS_14_06",
    "title": "요일별 매출 패턴",
    "domain": "SALES",
    "queryConfig": {
      "metricCode": "SLS_14",
      "period": "LAST_4_WEEKS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "periodType": "ROLLING",
      "isComparable": false
    },
    "description": "요일별 매출 패턴"
  },
  {
    "cardId": "MNU_01_01",
    "title": "오늘 메뉴별 매출 랭킹",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_01",
      "period": "TODAY",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "RANKING",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "MENU",
      "periodType": "MIXED",
      "isComparable": false
    },
    "description": "메뉴별 매출 랭킹"
  },
  {
    "cardId": "MNU_01_04",
    "title": "최근 7일 메뉴별 매출 랭킹",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_01",
      "period": "LAST_7_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "RANKING",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "MENU",
      "periodType": "MIXED",
      "isComparable": false
    },
    "description": "메뉴별 매출 랭킹"
  },
  {
    "cardId": "MNU_01_05",
    "title": "최근 30일 메뉴별 매출 랭킹",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_01",
      "period": "LAST_30_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "RANKING",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "MENU",
      "periodType": "MIXED",
      "isComparable": false
    },
    "description": "메뉴별 매출 랭킹"
  },
  {
    "cardId": "MNU_02_01",
    "title": "오늘 카테고리별 매출 랭킹",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_02",
      "period": "TODAY",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "CATEGORY",
      "periodType": "ROLLING",
      "isComparable": false
    },
    "description": "카테고리별 매출"
  },
  {
    "cardId": "MNU_02_02",
    "title": "최근 7일 카테고리별 매출 랭킹",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_02",
      "period": "LAST_7_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "CATEGORY",
      "periodType": "ROLLING",
      "isComparable": false
    },
    "description": "카테고리별 매출"
  },
  {
    "cardId": "MNU_02_03",
    "title": "최근 30일 카테고리별 매출 랭킹",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_02",
      "period": "LAST_30_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "CATEGORY",
      "periodType": "ROLLING",
      "isComparable": false
    },
    "description": "카테고리별 매출"
  },
  {
    "cardId": "MNU_03_01",
    "title": "오늘 시간대별 메뉴 주문건수",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_03",
      "period": "TODAY",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "STACKED_BAR",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "MIXED",
      "isComparable": false
    },
    "description": "시간대별 메뉴 주문"
  },
  {
    "cardId": "MNU_03_02",
    "title": "최근 7일 시간대별 메뉴 주문건수",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_03",
      "period": "LAST_7_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "STACKED_BAR",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "MIXED",
      "isComparable": false
    },
    "description": "시간대별 메뉴 주문"
  },
  {
    "cardId": "MNU_03_03",
    "title": "최근 30일 시간대별 메뉴 주문건수",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_03",
      "period": "LAST_30_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "STACKED_BAR",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "MIXED",
      "isComparable": false
    },
    "description": "시간대별 메뉴 주문"
  },
  {
    "cardId": "MNU_04_01",
    "title": "오늘 식재료 소진량",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_04",
      "period": "TODAY",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "RANKING",
      "subChartType": "NONE",
      "unitType": "VOLUME",
      "subUnitType": "NONE",
      "xAxisType": "INGREDIENT",
      "periodType": "FIXED",
      "isComparable": false
    },
    "description": "식재료 소진량"
  },
  {
    "cardId": "MNU_05_04",
    "title": "최근 7일 인기 메뉴 조합",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_05",
      "period": "LAST_7_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "RANKING",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "MONEY",
      "xAxisType": "MENU",
      "periodType": "ROLLING",
      "isComparable": false
    },
    "description": "인기 메뉴 조합"
  },
  {
    "cardId": "MNU_05_05",
    "title": "최근 14일 인기 메뉴 조합",
    "domain": "MENU",
    "queryConfig": {
      "metricCode": "MNU_05",
      "period": "LAST_14_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "RANKING",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "MONEY",
      "xAxisType": "MENU",
      "periodType": "ROLLING",
      "isComparable": false
    },
    "description": "인기 메뉴 조합"
  },
  {
    "cardId": "WTH_01_01",
    "title": "오늘 날씨 예보",
    "domain": "WEATHER",
    "queryConfig": {
      "metricCode": "WTH_01",
      "period": "TODAY",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "NONE",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": false
    },
    "description": "오늘 날씨 예보"
  },
  {
    "cardId": "WTH_02_01",
    "title": "오늘 시간별 예보",
    "domain": "WEATHER",
    "queryConfig": {
      "metricCode": "WTH_02",
      "period": "TODAY",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "LINE",
      "unitType": "TEMP",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": false
    },
    "description": "오늘 시간별 예보"
  },
  {
    "cardId": "WTH_03_04",
    "title": "주간 날씨 예보",
    "domain": "WEATHER",
    "queryConfig": {
      "metricCode": "WTH_03",
      "period": "LAST_7_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "TEMP",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "periodType": "FIXED",
      "isComparable": false
    },
    "description": "주간 날씨 예보"
  },
  {
    "cardId": "WTH_04_07",
    "title": "강수 인사이트",
    "domain": "WEATHER",
    "queryConfig": {
      "metricCode": "WTH_04",
      "period": "LAST_365_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "PERCENT",
      "subUnitType": "NONE",
      "xAxisType": "WEATHER",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "강수 인사이트"
  },
  {
    "cardId": "WTH_05_07",
    "title": "비강수일 vs 강수일 판매채널별 주문건수 비율 비교",
    "domain": "WEATHER",
    "queryConfig": {
      "metricCode": "WTH_05",
      "period": "LAST_365_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "NONE",
      "unitType": "PERCENT",
      "subUnitType": "NONE",
      "xAxisType": "WEATHER",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "강수별 주문 비율"
  },
  {
    "cardId": "WTH_06_07",
    "title": "비강수일 vs 강수일 평균 주문수 및 매출 비교",
    "domain": "WEATHER",
    "queryConfig": {
      "metricCode": "WTH_06",
      "period": "LAST_365_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "PERCENT",
      "subUnitType": "NONE",
      "xAxisType": "WEATHER",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "강수별 매출 변화"
  },
  {
    "cardId": "WTH_07_01",
    "title": "날씨 분석 (기온별)",
    "domain": "WEATHER",
    "queryConfig": {
      "metricCode": "WTH_07",
      "period": "LAST_365_DAYS",
      "comparePeriod": "NONE"
    },
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "MONEY",
      "xAxisType": "TEMPERATURE",
      "periodType": "FIXED",
      "isComparable": true
    },
    "description": "기온별 매출 분석"
  }
]
```

## 4. 상세 지표 전체

<aside>
❗

만들어 놓은 Enum 클래스들 AI한테 주고 json으로 뱉으라고 한 거임.

정책서와 대조하여 팩트체크 반드시 필요.

</aside>

```json
[
  {
    "metricCode": "SLS_01",
    "description": "실매출 현황",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": true
    }
  },
  {
    "metricCode": "SLS_02",
    "description": "주문건수 현황",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": true
    }
  },
  {
    "metricCode": "SLS_03",
    "description": "건당 평균가",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": true
    }
  },
  {
    "metricCode": "SLS_04",
    "description": "총매출 현황",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": false
    }
  },
  {
    "metricCode": "SLS_05",
    "description": "할인 및 취소",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": false
    }
  },
  {
    "metricCode": "SLS_06",
    "description": "판매유형별 매출",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "SALES_TYPE",
      "subXAxisType": "NONE",
      "periodType": "MIXED",
      "isComparable": true
    }
  },
  {
    "metricCode": "SLS_07",
    "description": "주문수단별 매출",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "ORDER_METHOD",
      "subXAxisType": "NONE",
      "periodType": "MIXED",
      "isComparable": true
    }
  },
  {
    "metricCode": "SLS_08",
    "description": "결제수단별 매출",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "PAYMENT_METHOD",
      "subXAxisType": "NONE",
      "periodType": "MIXED",
      "isComparable": true
    }
  },
  {
    "metricCode": "SLS_09",
    "description": "일별 매출 추이",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "LINE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "ROLLING",
      "isComparable": false
    }
  },
  {
    "metricCode": "SLS_10",
    "description": "주별 매출 추이",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "LINE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "ROLLING",
      "isComparable": false
    }
  },
  {
    "metricCode": "SLS_11",
    "description": "월별 매출 추이",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "LINE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": false
    }
  },
  {
    "metricCode": "SLS_12",
    "description": "연별 매출 추이",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": false
    }
  },
  {
    "metricCode": "SLS_13",
    "description": "피크타임 분석",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "LINE",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "MONEY",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": true
    }
  },
  {
    "metricCode": "SLS_14",
    "description": "요일별 매출 패턴",
    "domain": "SALES",
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "ROLLING",
      "isComparable": false
    }
  },
  {
    "metricCode": "MNU_01",
    "description": "메뉴별 매출 랭킹",
    "domain": "MENU",
    "uiConfig": {
      "chartType": "RANKING",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "COUNT",
      "xAxisType": "MENU",
      "subXAxisType": "NONE",
      "periodType": "MIXED",
      "isComparable": false
    }
  },
  {
    "metricCode": "MNU_02",
    "description": "카테고리별 매출",
    "domain": "MENU",
    "uiConfig": {
      "chartType": "DONUT",
      "subChartType": "NONE",
      "unitType": "MONEY",
      "subUnitType": "NONE",
      "xAxisType": "CATEGORY",
      "subXAxisType": "NONE",
      "periodType": "ROLLING",
      "isComparable": false
    }
  },
  {
    "metricCode": "MNU_03",
    "description": "시간대별 메뉴 주문",
    "domain": "MENU",
    "uiConfig": {
      "chartType": "STACKED_BAR",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "subXAxisType": "MENU",
      "periodType": "MIXED",
      "isComparable": false
    }
  },
  {
    "metricCode": "MNU_04",
    "description": "식재료 소진량",
    "domain": "MENU",
    "uiConfig": {
      "chartType": "RANKING",
      "subChartType": "NONE",
      "unitType": "VOLUME",
      "subUnitType": "NONE",
      "xAxisType": "INGREDIENT",
      "subXAxisType": "UNIT",
      "periodType": "FIXED",
      "isComparable": false
    }
  },
  {
    "metricCode": "MNU_05",
    "description": "인기 메뉴 조합",
    "domain": "MENU",
    "uiConfig": {
      "chartType": "RANKING",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "MONEY",
      "xAxisType": "MENU",
      "subXAxisType": "NONE",
      "periodType": "ROLLING",
      "isComparable": false
    }
  },
  {
    "metricCode": "WTH_01",
    "description": "오늘 날씨 예보",
    "domain": "WEATHER",
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "NONE",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": false
    }
  },
  {
    "metricCode": "WTH_02",
    "description": "오늘 시간별 예보",
    "domain": "WEATHER",
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "LINE",
      "unitType": "TEMP",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": false
    }
  },
  {
    "metricCode": "WTH_03",
    "description": "주간 날씨 예보",
    "domain": "WEATHER",
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "TEMP",
      "subUnitType": "NONE",
      "xAxisType": "TIME",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": false
    }
  },
  {
    "metricCode": "WTH_04",
    "description": "강수 인사이트",
    "domain": "WEATHER",
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "PERCENT",
      "subUnitType": "NONE",
      "xAxisType": "WEATHER",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": true
    }
  },
  {
    "metricCode": "WTH_05",
    "description": "강수별 주문 비율",
    "domain": "WEATHER",
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "NONE",
      "unitType": "PERCENT",
      "subUnitType": "NONE",
      "xAxisType": "WEATHER",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": true
    }
  },
  {
    "metricCode": "WTH_06",
    "description": "강수별 매출 변화",
    "domain": "WEATHER",
    "uiConfig": {
      "chartType": "METRIC_CARD",
      "subChartType": "NONE",
      "unitType": "PERCENT",
      "subUnitType": "NONE",
      "xAxisType": "WEATHER",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": true
    }
  },
  {
    "metricCode": "WTH_07",
    "description": "기온별 매출 분석",
    "domain": "WEATHER",
    "uiConfig": {
      "chartType": "BAR",
      "subChartType": "NONE",
      "unitType": "COUNT",
      "subUnitType": "MONEY",
      "xAxisType": "TEMPERATURE",
      "subXAxisType": "NONE",
      "periodType": "FIXED",
      "isComparable": true
    }
  }
]
```
