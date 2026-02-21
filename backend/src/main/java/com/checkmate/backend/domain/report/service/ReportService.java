package com.checkmate.backend.domain.report.service;

import com.checkmate.backend.domain.report.dto.response.CalendarResponse;
import com.checkmate.backend.domain.report.dto.response.ReportResponse;
import com.checkmate.backend.domain.report.repository.ReportRepository;
import com.checkmate.backend.global.exception.NotFoundException;
import com.checkmate.backend.global.response.ErrorStatus;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportResponse getReportDetail(Long storeId, LocalDate date) {
        return reportRepository
                .findByStoreIdAndTargetDate(storeId, date)
                .map(ReportResponse::from)
                .orElse(null);
    }

    public CalendarResponse getMonthlyCalendar(Long storeId, int year, int month) {
        LocalDate monthStart = LocalDate.of(year, month, 1);
        LocalDate monthEnd = monthStart.withDayOfMonth(monthStart.lengthOfMonth());

        LocalDate searchStart = monthStart.minusDays(7);
        LocalDate searchEnd = monthEnd.plusDays(7);

        List<CalendarResponse.DaySales> sales =
                reportRepository
                        .findAllByStoreIdAndTargetDateBetween(storeId, searchStart, searchEnd)
                        .stream()
                        .map(r -> new CalendarResponse.DaySales(r.getTargetDate(), r.getNetSales()))
                        .toList();

        return new CalendarResponse(sales);
    }
}
