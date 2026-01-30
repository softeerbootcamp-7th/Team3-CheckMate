package com.checkmate.backend.domain.menu.controller;

import static com.checkmate.backend.global.response.SuccessStatus.INGREDIENT_GET_SUCCESS;

import com.checkmate.backend.domain.menu.service.IngredientService;
import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Ingredient", description = "식재료 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ingredients")
@Slf4j
public class IngredientController {
    private final IngredientService ingredientService;

    /*
     * read
     * */

    @Operation(summary = "식재료 검색 API (용범)")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "식재료 조회에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "매장을 찾을 수 없습니다."),
    })
    @GetMapping
    public ResponseEntity<ApiResponse<List<String>>> findIngredientBy(
            @RequestAttribute("memberId") Long memberId, @RequestParam("keyword") String keyword) {

        List<String> response = ingredientService.getNamesByKeyword(memberId, keyword);

        return ApiResponse.success(INGREDIENT_GET_SUCCESS, response);
    }
}
