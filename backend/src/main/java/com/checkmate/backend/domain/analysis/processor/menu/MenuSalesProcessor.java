package com.checkmate.backend.domain.analysis.processor.menu;

import com.checkmate.backend.domain.analysis.context.MenuAnalysisContext;
import com.checkmate.backend.domain.analysis.dto.projection.MenuSalesProjection;
import com.checkmate.backend.domain.analysis.dto.response.AnalysisResponse;
import com.checkmate.backend.domain.analysis.dto.response.menu.MenuSalesResponse;
import com.checkmate.backend.domain.analysis.enums.AnalysisCardCode;
import com.checkmate.backend.domain.analysis.enums.AnalysisCode;
import com.checkmate.backend.domain.analysis.processor.AnalysisProcessor;
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
    public AnalysisResponse process(MenuAnalysisContext context) {

        List<MenuSalesProjection> projections =
                menuAnalysisRepository.findMenuSales(
                        context.getStoreId(), context.getStartDate(), context.getEndDate());

        List<MenuSalesResponse.MenuSalesItem> items =
                projections.stream().map(MenuSalesResponse.MenuSalesItem::of).toList();

        MenuSalesResponse response = new MenuSalesResponse(items);

        return new AnalysisResponse(context.getAnalysisCardCode(), response, response);
    }
}
