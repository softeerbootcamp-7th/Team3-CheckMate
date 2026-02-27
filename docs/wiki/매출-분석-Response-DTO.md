# 매출 분석 Response DTO

> 참여자: 이영재, 이용범

# SLS_01 실매출

## Response

```json
{"netAmount":0,"differenceAmount":0,"changeRate":0.0}

```

## 필드 설명

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| netAmount | Long | 현재 기간 실매출 |
| differenceAmount | Long | 비교 기간 대비 실매출 차액 |
| changeRate | Double | 비교 기간 대비 변화율 (%) |
| hasPreviousData | Boolean | 비교 대상 실매출이 0인 |

---

# SLS_02 주문건수

## Response

```json
{"orderCount":0,"differenceOrderCount":0,"changeRate":0.0}
```

## 필드 설명

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| orderCount | Long | 현재 기간 주문 건수 |
| differenceOrderCount | Long | 비교 기간 대비 주문 건수 차이 |
| changeRate | Double | 비교 기간 대비 변화율 (%) |
| hasPreviousData | Boolean | 비교 대상 실매출이 0인 |

---

# SLS_03 건당 평균가

## Response

```json
{"averageOrderAmount":0,"differenceAmount":0}
```

## 필드 설명

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| averageOrderAmount | Long | 현재 기간 건당 평균 주문 금액 |
| differenceAmount | Long | 비교 기간 대비 평균 주문 금액 차이 |
| hasPreviousData | Boolean | 비교 대상 실매출이 0인 |

---

# SLS_06 판매유형별 매출

---

## 공통 객체

### SalesInsight

> 오늘 기준 상위 매출 유형 요약 정보
> 

```json
{"topType":"홀","topShare":0.0,"deltaShare":0.0,"showDeltaText":false,"showFocusText":false}
```

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| topType | String | 매출 비중이 가장 높은  유형 |
| topShare | double | 해당 유형의 매출 비중 (%) |
| deltaShare | double | 비교 기간 대비 비중 변화량 (%p) |
| showDeltaText | boolean | 변화 문구 표시 여부 (deltaShare ≥ 3%p) |
| showFocusText | boolean | 집중 문구 표시 여부 (topShare ≥ 60%) |

---

### SalesByTypeItem

```json
{"salesType":"HALL","salesAmount":0,"orderCount":0,"share":0.0,"deltaShare":0.0}
```

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| salesType | SalesType (Enum) | 판매 유형 (홀 / 포장 / 배달 등) |
| salesAmount | long | 해당 유형 실매출 금액 |
| orderCount | long | 해당 유형 주문 건수 |
| share | double | 현재 기간 매출 비중 (%) |
| deltaShare | double | 비교 기간 대비 비중 변화량 (%p)BB |

---

## 대시보드 - 오늘 판매유형별 매출 (SLS_06_1)

```json
{"insight":{},"items":[]}
```

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| insight | SalesInsight | 판매 유형 요약 정보 |
| items | List<SalesByTypeItem> | 판매 유형 상세 리스트 |

---

## 상세분석 - 오늘 판매유형별 매출

```json
{"items":[]}
```

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| items | List<SalesByTypeItem> | 판매 유형 상세 리스트 |

---

## 이번주 / 이번달 판매유형별 매출 (SLS_06_02, SLS_06_03)

```json
{"items":[]}
```

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| items | List<SalesByTypeItem> | 판매 유형 상세 리스트 |

---

# SLS_07 주문수단별 매출

---

### SalesByOrderChannelItem

```json
{"orderChannel":"POS","salesAmount":0,"orderCount":0,"share":0.0,"deltaShare":0.0}
```

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| orderChannel | String | 주문 수단 (POS, 키오스크, 배달앱 등) |
| salesAmount | long | 해당 주문 수단 실매출 금액 |
| orderCount | long | 해당 주문 수단 주문 건수 |
| share | double | 현재 기간 매출 비중 (%) |
| deltaShare | double | 비교 기간 대비 비중 변화량 (%p) |

---

## 대시보드 - 오늘 주문수단별 매출 (SLS_07_1)

```json
{"insight":{},"items":[]}
```

---

## 상세분석 - 오늘 주문수단별 매출

```json
{"items":[]}
```

---

## 이번주 / 이번달 주문수단별 매출 (SLS_07_02, SLS_07_03)

```json
{"items":[]}
```

---

# SLS_08 결제수단별 매출

---

### SalesByPayMethodItem

```json
{"payMethod":"CARD","salesAmount":0,"orderCount":0,"share":0.0,"deltaShare":0.0}
```

| 필드명 | 타입 | 설명 |
| --- | --- | --- |
| payMethod | String | 결제 수단 (카드, 현금, 간편결제, 기타 등) |
| salesAmount | long | 해당 결제 수단 실매출 금액 |
| orderCount | long | 해당 결제 수단 주문 건수 |
| share | double | 현재 기간 매출 비중 (%) |
| deltaShare | double | 비교 기간 대비 비중 변화량 (%p) |

---

## 대시보드 - 오늘 결제수단별 매출 (SLS_08_1)

```json
{"insight":{},"items":[]}
```

---

## 상세분석 - 오늘 결제수단별 매출

```json
{"items":[]}
```

---

# 📌 계산 기준 정리

### 매출 비중 (share)

```
(해당 항목 실매출 / 전체 실매출) *100
```

---

### 비중 변화량 (deltaShare)

```
현재 기간share - 비교 기간share
```

👉 단위: %p (퍼센트포인트)

---

---

# 📊 SLS_09 ~ SLS_12 – 매출 추이 (Sales Trend)

> 기간 단위별 매출 및 주문 추이를 조회합니다.
bucket 누락 구간은 **0으로 보정**됩니다.
> 

---

# 1️⃣ DashboardSalesTrendResponse

👉 현재 기준 구간의 매출 요약 데이터

---

## ✅ Response Field 정의

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| label | String | 현재 기준 구간 라벨 | 오늘 |
| netAmount | Long | 해당 구간 실매출 합계 | 350000 |
| orderCount | Long | 해당 구간 주문 건수 | 120 |

---

## ✅ 동작 기준

- anchor 기준 현재 bucket 데이터 반환
- bucket 데이터가 존재하지 않을 경우

```json
{
  "label": "0",
  "netAmount": 0,
  "orderCount": 0
}
```

---

## ✅ 샘플 Response

```json
{
  "label": "오늘",
  "netAmount": 350000,
  "orderCount": 120
}
```

---

# 2️⃣ DetailSalesTrendResponse

👉 기간 전체 추이 데이터

---

## ✅ Response Field 정의

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| items | List<SalesTrendItem> | 기간별 매출 추이 리스트 | - |

---

# 3️⃣ SalesTrendItem

---

## ✅ Response Field 정의

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| label | String | 그래프 X축 라벨 | 3월 1일 |
| netAmount | Long | 실매출 합계 | 350000 |
| orderCount | Long | 주문 건수 | 120 |

---

## ✅ 샘플 Response

```json
{
  "items": [
    {
      "label": "3월 1일",
      "netAmount": 350000,
      "orderCount": 120
    },
    {
      "label": "3월 2일",
      "netAmount": 420000,
      "orderCount": 150
    }
  ]
}
```

---

# 📌 Bucket 생성 규칙

## ✔ bucket 범위

- startDate ~ endDate 사이 모든 구간 생성
- DB 데이터 없는 구간 → 0으로 채움

---

## ✔ bucket 시작 기준

| 단위 | 기준 |
| --- | --- |
| DAY | 해당 날짜 |
| WEEK | 해당 주 월요일 |
| MONTH | 해당 월 1일 |
| YEAR | 해당 연도 1월 1일 |

---

# 📌 label 생성 규칙

## ✔ 현재 bucket

| 단위 | 라벨 |
| --- | --- |
| DAY | 오늘 |
| WEEK | 이번주 |
| MONTH | 이번달 |
| YEAR | yyyy년 |

---

## ✔ 과거 bucket

### DAY

```
3월 1일
```

---

### WEEK

✔ 같은 달

```
3월 1~7일
```

✔ 다른 달

```
3월 29일~4월 4일
```

---

### MONTH

```
2025년 3월
```

---

### YEAR

```
2025년
```

---

# 📌 지원 분석 코드

| 코드 | 설명 | bucket 단위 |
| --- | --- | --- |
| SLS_09 | 일별 매출 추이 | DAY |
| SLS_10 | 주별 매출 추이 | WEEK |
| SLS_11 | 월별 매출 추이 | MONTH |
| SLS_12 | 연별 매출 추이 | YEAR |

---

# 📌 데이터 기준

### netAmount

- 할인 / 취소 반영 후 실제 매출 금액

### orderCount

- 해당 bucket 주문 총 건수

---

# 📌 내부 처리 특징 (중요)

### ✔ bucket 보정

- DB 조회 결과 없는 날짜도 items 포함됨

### ✔ dashboard 추출 기준

- anchor 기준 현재 bucket 데이터 사용

---

# SLS_13_01 – 피크타임 (Peak Time)

+이동 관련 브리핑 메세지는 제거

## **1️⃣ DetailPeakTimeResponse (변경)**

**Response 구조:**

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| items | List<PeakTimeItem> | 시간대별 주문건수 및 실매출 | - |

**PeakTimeItem 내부 구조**

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| timeSlot2H | int | 2시간 단위 타임슬롯 | 10 |
| orderCount | long | 주문 건수 | 50 |
| netAmount | long | 실매출 | 1250000 |

## **DetailPeakTimeResponse (수정)**

| **필드명** | **타입** | **설명** | **예시** |
| --- | --- | --- | --- |
| todayItems | PeakTimeItem[] | 오늘 시간대별(2시간 단위) 누적 데이터 목록 | [{"timeSlot2H":10,"orderCount":50,"netAmount":1250000},{"timeSlot2H":12,"orderCount":70,"netAmount":1800000}] |
| week4Items | PeakTimeItem[] | 최근 4주 동일 요일 평균 시간대별 데이터 목록 | [{"timeSlot2H":10,"orderCount":45,"netAmount":1125000},{"timeSlot2H":12,"orderCount":65,"netAmount":1625000}] |
| todayPeak | Integer | 오늘 최고 주문 발생 시간대 슬롯(timeSlot2H) | 70 |
| comparisonPeak | Integer | 비교 대상 최고 주문 발생 시간대 슬롯(timeSlot2H) | 65 |
| diff | Integer | 오늘 peak와 비교 peak의 시간 차이 | 5 |
| shiftDirection | ShiftDirection | 전일 대비 피크 이동 방향 | UP |
| beforeComparisonPeak | boolean | 현재 시점이 비교 대상 최고 시간대 이전인지 여부 (true: 이전, false: 같거나 이후) | true |

**샘플 Response:**

```json
{"items":[{"timeSlot2H":10,"orderCount":50,"netAmount":1250000},{"timeSlot2H":12,"orderCount":70,"netAmount":1800000}]}
```

---

## **2️⃣ DashboardPeakTimeResponse**

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| timeSlot2H | int | 2시간 단위 타임슬롯 | 10 |
| orderCount | long | 주문 건수 | 50 |
| netAmount | long | 실매출 | 1250000 |
| todayPeak | Integer | 오늘 최고 주문이 발생한 **시간대 슬롯(timeSlot2H)** | 70 |
| comparisonPeak | Integer | 비교 대상 최고 주문이 발생한 **시간대 슬롯(timeSlot2H)** | 65 |
| diff | Integer | 오늘과 비교 대상 peak 시간 차이 | 5 |
| shiftDirection | ShiftDirection | 전일 대비 상승/하강 | UP |
| beforeComparisonPeak | boolean | **현재 시점이 비교 대상 최고 주문 시간대(comparisonPeak) 이전인지 여부**를 나타냄.  - `true` → 현재 시간이 비교 대상 최고 시간대보다 **이전**  - `false` → 현재 시간이 비교 대상 최고 시간대 **같거나 이후** | true |

## **3️⃣ ShiftDirection (시간대 변화 방향)**

| 값 | 설명 |
| --- | --- |
| EARLY | 최고 주문 시간대가 이전보다 **앞으로 이동** |
| LATE | 최고 주문 시간대가 이전보다 **뒤로 이동** |
| SAME | 최고 주문 시간대가 **변동 없음** |
| UNKNOWN | 변화 방향을 **판단할 수 없음** |

**샘플 Response:**

```json
{"timeSlot2H":10,"orderCount":50,"netAmount":1250000,"todayPeak":70,"comparisonPeak":65,"diff":5,"shiftDirection":"UP","beforeComparisonPeak":true}
```

---

# SLS_14_06 – 요일별 매출 (Sales by Day)

## **1️⃣ DetailSalesByDayResponse**

**Response 구조:**

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| items | List<SalesByDayItem> | 요일별 평균 매출/주문 건수 리스트 | -SS |

**SalesByDayItem 내부 구조**

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| day | String | 요일 | "월" |
| avgNetAmount | double | 평균 실매출 | 1250000.523 |
| orderCount | long | 주문 건수 | 87 |

**샘플 Response:**

```json
{"items":[{"day":"월","avgNetAmount":1250000.523,"orderCount":87},{"day":"화","avgNetAmount":980000.0,"orderCount":65}]}
```

---

## **2️⃣ DashboardSalesByDayResponse**

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| day | String | 요일 | "월" |
| avgNetAmount | double | 평균 실매출 | 1250000.523 |
| orderCount | long | 주문 건수 | 87 |
| topDay | String | 최고 요일 | "월" |
| isSignificant | boolean | 통계적 유의 여부 | true |

**샘플 Response:**

```json
{"day":"월","avgNetAmount":1250000.523,"orderCount":87,"topDay":"월","isSignificant":true}
```

---
