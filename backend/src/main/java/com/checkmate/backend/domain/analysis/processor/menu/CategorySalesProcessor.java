package com.checkmate.backend.domain.analysis.processor.menu;

import com.checkmate.backend.domain.analysis.context.MenuAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.response.menu.CategorySalesResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
import com.checkmate.backend.domain.analysis.result.AnalysisResult;
import com.checkmate.backend.domain.analysis.result.DefaultAnalysisResult;
import com.checkmate.backend.domain.order.repository.MenuAnalysisRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

/** MNU_02 (카테코리별 매출) */
@Component
@RequiredArgsConstructor
@Slf4j
public class CategorySalesProcessor implements AnalysisProcessor<MenuAnalysisContext> {
    private final MenuAnalysisRepository menuAnalysisRepository;

    @Override
    public boolean supports(AnalysisCardCode analysisCardCode) {
        return AnalysisCode.MNU_02 == analysisCardCode.getMetricCode();
    }

    @Override
    public AnalysisResult process(MenuAnalysisContext context) {

        // 상위 5개만
        Pageable pageable = PageRequest.of(0, 5);

        List<CategorySalesResponse> categorySalesResponses =
                menuAnalysisRepository.findCategorySales(
                        context.getStoreId(),
                        context.getStartDate(),
                        context.getEndDate(),
                        pageable);

        return new DefaultAnalysisResult<>(context.getAnalysisCardCode(), categorySalesResponses);
    }
}
