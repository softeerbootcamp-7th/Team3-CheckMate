package com.checkmate.backend.domain.analysis.processor;

import com.checkmate.backend.domain.analysis.context.MenuAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.response.MenuSalesResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.result.AnalysisResult;
import com.checkmate.backend.domain.analysis.result.DefaultAnalysisResult;
import com.checkmate.backend.domain.order.repository.MenuAnalysisRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/** MUN_01 (메뉴별 매출 랭킹) */
@Component
@RequiredArgsConstructor
@Slf4j
public class MenuSalesProcessor implements AnalysisProcessor<MenuAnalysisContext> {
    private final MenuAnalysisRepository menuAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.MNU_01 == analysisCardCode.getMetricCode();
    }

    @Override
    public AnalysisResult process(MenuAnalysisContext context) {

        List<MenuSalesResponse> menuSalesResponses =
                menuAnalysisRepository.findMenuSales(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        return new DefaultAnalysisResult<>(context.getAnalysisCardCode(), menuSalesResponses);
    }
}
