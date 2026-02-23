package com.checkmate.backend.domain.store.dto.response;

import com.checkmate.backend.domain.store.entity.BusinessHour;
import com.checkmate.backend.domain.store.entity.Store;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record StoreResponse(
        @Schema(description = "매장명") String storeName,
        @Schema(description = "매출 마감 시간") Integer salesClosingHour,
        @Schema(description = "영업 시간 정보") List<BusinessHourResponse> businessHourResponses) {

    public record BusinessHourResponse(
            @Schema(description = "요일") String dayOfWeek,
            @Schema(description = "영업 시작 시간 (HH:mm, 30분 단위)") String openTime,
            @Schema(description = "영업 마감 시간 (HH:mm)") String closeTime,
            @Schema(description = "휴무 여부") boolean closed,
            @Schema(description = "24시간 영업 유무") @JsonProperty("is24") boolean open24Hours) {

        public static BusinessHourResponse of(BusinessHour businessHour) {
            return new BusinessHourResponse(
                    businessHour.getDay(),
                    businessHour.getOpenTime(),
                    businessHour.getCloseTime(),
                    businessHour.isClosed(),
                    businessHour.isOpen24Hours());
        }
    }

    public static StoreResponse of(Store store, List<BusinessHourResponse> businessHours) {
        return new StoreResponse(store.getStoreName(), store.getSalesClosingHour(), businessHours);
    }
}
