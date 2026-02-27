# 메뉴 분석 Response DTO

> 참여자: 권민선, 이영재, 이용범

# 메뉴 관련 API 응답

---

## **1. MNU_01 – 메뉴별 매출 랭킹 (Menu Sales Ranking)**

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| menuName | String | 메뉴 이름 | "불고기 버거" |
| totalSalesAmount | Long | 총 매출액 (원 단위) | 1500000 |
| orderCount | Long | 판매 건수 | 120 |

**샘플 Response:**

```json
{
  "items": [
    {
      "menuName": "불고기 버거",
      "totalSalesAmount": 1500000,
      "orderCount": 120
    },
    {
      "menuName": "치즈버거",
      "totalSalesAmount": 1200000,
      "orderCount": 100
    }
  ]
}

```

---

## **2. MNU_02 – 카테고리별 매출 (Category Sales)**

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| category | String | 카테고리 이름 | "버거" |
| totalSalesAmount | Long | 총 매출액 | 2700000 |

**샘플 Response:**

```json
{
  "items": [
    {
      "category": "버거",
      "totalSalesAmount": 2700000
    },
    {
      "category": "음료",
      "totalSalesAmount": 500000
    }
  ]
}

```

---

# 3. MNU_03 – 시간대별 메뉴 주문건수

---

## DetailTimeSlotMenuOrderCountResponse

### ✅ Response Field 정의

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| items | List<TimeSlotMenuGroupItem> | 시간대별 메뉴 주문 그룹 리스트 | - |

---

### ✅ TimeSlotMenuGroupItem

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| timeSlot2H | Integer | 2시간 단위 타임슬롯 | 10 |
| totalOrderCount | Long | 해당 시간대 총 주문 건수 | 50 |
| menus | List<TimeSlotMenuOrderCountItem> | 메뉴별 주문 건수 리스트 | - |

---

### ✅ TimeSlotMenuOrderCountItem

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| menuName | String | 메뉴 이름 | 불고기 버거 |
| orderCount | Long | 주문 건수 | 30 |

---

### ✅ 샘플 Response

```json
{"items":[{"timeSlot2H":10,"totalOrderCount":50,"menus":[{"menuName":"불고기 버거","orderCount":30},{"menuName":"치즈버거","orderCount":20}]}]}
```

---

## DashboardTimeSlotMenuOrderCountResponse

### ✅ Response Field 정의

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| timeSlot2H | Integer | 2시간 단위 타임슬롯 | 10 |
| menuName | String | 해당 시간대 대표 메뉴 | 불고기 버거 |

---

### ✅ 샘플 Response

```json
{"timeSlot2H":10,"menuName":"불고기 버거"}
```

---

# 4. MNU_04 – 식자재 소진량

---

## IngredientUsageResponse

### ✅ Response Field 정의

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| hasIngredient | boolean | 식자재 등록 여부 | true |
| items | List<IngredientUsageItem> | 식자재 소진량 리스트 | - |

---

### ✅ IngredientUsageItem

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| ingredientName | String | 식자재 이름 | 소고기 |
| totalQuantity | Long | 총 소진량 | 30000 |
| baseUnit | String | 단위 (g, ml 등) | g |

---

## ✅ 샘플 Response

### ✔ 식자재가 등록된 경우

```json
{"hasIngredient":true,"items":[{"ingredientName":"소고기","totalQuantity":30000,"baseUnit":"g"},{"ingredientName":"치즈","totalQuantity":5000,"baseUnit":"g"}]}
```

---

### ✔ 식자재가 등록되지 않은 경우

```json
{"hasIngredient":false,"items":[]}
```

---

# 5. MNU_05 – 인기 메뉴 조합

---

## DetailPopularMenuCombinationResponse

### ✅ Response Field 정의

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| items | List<PopularMenuCombinationItem> | 인기 메뉴 조합 리스트 | - |

---

### ✅ PopularMenuCombinationItem

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| baseMenuName | String | 기준 메뉴 (Top 메뉴) | 불고기 버거 |
| pairedMenus | List<PairedMenuItem> | 함께 주문된 메뉴 리스트 | - |

---

### ✅ PairedMenuItem

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| menuName | String | 함께 주문된 메뉴 이름 | 감자튀김 |
| count | Long | 함께 주문된 횟수 | 80 |

---

### ✅ 샘플 Response

```json
{"items":[{"baseMenuName":"불고기 버거","pairedMenus":[{"menuName":"감자튀김","count":80},{"menuName":"콜라","count":70}]}]}
```

---

## DashboardPopularMenuCombinationResponse

### ✅ Response Field 정의

| 필드명 | 타입 | 설명 | 예시 |
| --- | --- | --- | --- |
| firstMenuName | String | 조합 내 첫 번째 메뉴 | 불고기 버거 |
| secondMenuName | String | 함께 주문된 메뉴 | 감자튀김 |

---

### ✅ 샘플 Response

```json
{"firstMenuName":"불고기 버거","secondMenuName":"감자튀김"}
```

##

---
