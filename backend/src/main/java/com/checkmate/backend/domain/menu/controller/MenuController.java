package com.checkmate.backend.domain.menu.controller;

import static com.checkmate.backend.global.response.SuccessStatus.*;

import com.checkmate.backend.domain.menu.dto.request.IngredientCreateRequestDTO;
import com.checkmate.backend.domain.menu.dto.request.MenuCreateRequestDTO;
import com.checkmate.backend.domain.menu.dto.response.MenuCategoryResponseDTO;
import com.checkmate.backend.domain.menu.service.MenuService;
import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Menu", description = "메뉴 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menus")
@Slf4j
public class MenuController {
    private final MenuService menuService;

    /*
     * create
     * */

    @Operation(summary = "메뉴 등록 API (용범)", description = "입력: MenuCreateRequestDTO")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "201",
                description = "메뉴 등록에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "매장을 찾을 수 없습니다."),
    })
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createMenu(
            @RequestAttribute("memberId") Long memberId,
            @RequestBody MenuCreateRequestDTO menuCreateRequestDTO) {

        menuService.registerMenus(memberId, menuCreateRequestDTO);

        return ApiResponse.success_only(MENU_CREATE_SUCCESS);
    }

    @Operation(summary = "식재료 등록 API (용범)", description = "입력: IngredientCreateRequestDTO")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "201",
                description = "식재료 등록에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "403",
                description = "메뉴에 접근할 권한이 없습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "매장을 찾을 수 없습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "메뉴를 찾을 수 없습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "409",
                description = "이미 식자재(레시피)가 등록된 메뉴입니다."),
    })
    @PostMapping("/{menu-id}/ingredients")
    public ResponseEntity<ApiResponse<Void>> addIngredientsToMenu(
            @RequestAttribute("memberId") Long memberId,
            @PathVariable("menu-id") Long menuId,
            @RequestBody IngredientCreateRequestDTO ingredientCreateRequestDTO) {

        menuService.addIngredientsToMenu(memberId, menuId, ingredientCreateRequestDTO);

        return ApiResponse.success_only(INGREDIENT_CREATE_SUCCESS);
    }

    /*
     * read
     * */

    @Operation(summary = "메뉴 모두 조회 API (용범)", description = "출력: MenuResponseDTO")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "201",
                description = "메뉴 조회에 성공했습니다."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "매장을 찾을 수 없습니다."),
    })
    @GetMapping
    public ResponseEntity<ApiResponse<List<MenuCategoryResponseDTO>>> getMenus(
            @RequestAttribute("memberId") Long memberId) {

        List<MenuCategoryResponseDTO> response = menuService.getMenus(memberId);

        return ApiResponse.success(MENU_GET_SUCCESS, response);
    }
}
