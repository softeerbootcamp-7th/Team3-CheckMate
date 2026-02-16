package com.checkmate.backend.domain.menu.controller;

import static com.checkmate.backend.global.response.SuccessStatus.*;

import com.checkmate.backend.domain.menu.dto.request.IngredientCreateRequestDTO;
import com.checkmate.backend.domain.menu.dto.request.MenuCreateRequestDTO;
import com.checkmate.backend.domain.menu.dto.response.MenuCategoryResponseDTO;
import com.checkmate.backend.domain.menu.dto.response.MenuRecipeResponse;
import com.checkmate.backend.domain.menu.service.MenuService;
import com.checkmate.backend.global.auth.LoginMember;
import com.checkmate.backend.global.auth.MemberSession;
import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
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
                description = "메뉴 등록 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": true,\n"
                                                                + "  \"message\": \"메뉴 등록에 성공했습니다.\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "매장 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "매장 미존재 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"매장을 찾을 수 없습니다.\",\n"
                                                                + "  \"errorCode\": \"STORE_NOT_FOUND_EXCEPTION\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "서버 오류 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"서버 내부 오류가 발생했습니다.\",\n"
                                                                + "  \"errorCode\": \"INTERNAL_SERVER_ERROR\"\n"
                                                                + "}")))
    })
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> createMenu(
            @LoginMember MemberSession member,
            @RequestBody MenuCreateRequestDTO menuCreateRequestDTO) {

        menuService.registerMenus(member.storeId(), menuCreateRequestDTO);

        return ApiResponse.success_only(MENU_CREATE_SUCCESS);
    }

    @Operation(summary = "식재료 등록 API (용범)", description = "입력: IngredientCreateRequestDTO")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "201",
                description = "식재료 등록 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": true,\n"
                                                                + "  \"message\": \"식재료 등록에 성공했습니다.\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "403",
                description = "메뉴 접근 권한 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "권한 없음 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"메뉴에 접근할 권한이 없습니다.\",\n"
                                                                + "  \"errorCode\": \"MENU_ACCESS_DENIED\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "리소스 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "메뉴 미존재 예시",
                                            value =
                                                    "{\n"
                                                            + "  \"success\": false,\n"
                                                            + "  \"message\": \"메뉴를 찾을 수 없습니다.\",\n"
                                                            + "  \"errorCode\": \"MENU_NOT_FOUND_EXCEPTION\"\n"
                                                            + "}"),
                                    @ExampleObject(
                                            name = "식재료 미존재 예시",
                                            value =
                                                    "{\n"
                                                            + "  \"success\": false,\n"
                                                            + "  \"message\": \"식자재를 찾을 수 없습니다.\",\n"
                                                            + "  \"errorCode\": \"INGREDIENT_NOT_FUND_EXCEPTION\"\n"
                                                            + "}")
                                })),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "409",
                description = "이미 등록된 레시피",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "중복 레시피 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"이미 식자재(레시피)가 등록된 메뉴입니다.\",\n"
                                                                + "  \"errorCode\": \"MENU_RECIPE_ALREADY_EXISTS\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "서버 오류 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"서버 내부 오류가 발생했습니다.\",\n"
                                                                + "  \"errorCode\": \"INTERNAL_SERVER_ERROR\"\n"
                                                                + "}")))
    })
    @PostMapping("/{menu-id}/ingredients")
    public ResponseEntity<ApiResponse<Void>> addIngredientsToMenu(
            @LoginMember MemberSession member,
            @PathVariable("menu-id") Long menuId,
            @RequestBody IngredientCreateRequestDTO ingredientCreateRequestDTO) {

        menuService.addIngredientsToMenu(member.storeId(), menuId, ingredientCreateRequestDTO);

        return ApiResponse.success_only(INGREDIENT_CREATE_SUCCESS);
    }

    /*
     * read
     * */

    @Operation(summary = "메뉴 모두 조회 API (용범)", description = "출력: MenuResponseDTO")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "메뉴 조회 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": true,\n"
                                                                + "  \"message\": \"메뉴 조회에 성공했습니다.\",\n"
                                                                + "  \"data\": [\n"
                                                                + "    {\n"
                                                                + "      \"category\": \"한식\",\n"
                                                                + "      \"menus\": [\n"
                                                                + "        { \"menuId\": 1, \"name\": \"비빔밥\", \"price\": 8000 },\n"
                                                                + "        { \"menuId\": 2, \"name\": \"김치찌개\", \"price\": 7000 }\n"
                                                                + "      ]\n"
                                                                + "    },\n"
                                                                + "    {\n"
                                                                + "      \"category\": \"양식\",\n"
                                                                + "      \"menus\": [\n"
                                                                + "        { \"menuId\": 3, \"name\": \"스파게티\", \"price\": 9000 }\n"
                                                                + "      ]\n"
                                                                + "    }\n"
                                                                + "  ]\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "서버 오류 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"서버 내부 오류가 발생했습니다.\",\n"
                                                                + "  \"errorCode\": \"INTERNAL_SERVER_ERROR\"\n"
                                                                + "}")))
    })
    @GetMapping
    public ResponseEntity<ApiResponse<List<MenuCategoryResponseDTO>>> getMenus(
            @LoginMember MemberSession member) {

        List<MenuCategoryResponseDTO> response = menuService.getMenus(member.storeId());

        return ApiResponse.success(MENU_GET_SUCCESS, response);
    }

    @Operation(summary = "메뉴 레시피 조회 API (용범)", description = "출력: MenuResponseDTO")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "메뉴 조회 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "성공 응답 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": true,\n"
                                                                + "  \"message\": \"메뉴 조회에 성공했습니다.\",\n"
                                                                + "  \"data\": {\n"
                                                                + "    \"menuName\": \"비빔밥\",\n"
                                                                + "    \"ingredients\": [\n"
                                                                + "      { \"name\": \"쌀\", \"quantity\": 200, \"unit\": \"G\" },\n"
                                                                + "      { \"name\": \"고추장\", \"quantity\": 30, \"unit\": \"G\" }\n"
                                                                + "    ]\n"
                                                                + "  }\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "403",
                description = "메뉴 접근 권한 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "권한 없음 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"메뉴에 접근할 권한이 없습니다.\",\n"
                                                                + "  \"errorCode\": \"MENU_ACCESS_DENIED\"\n"
                                                                + "}"))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "메뉴 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "메뉴 미존재 예시 1",
                                            value =
                                                    "{\n"
                                                            + "  \"success\": false,\n"
                                                            + "  \"message\": \"메뉴를 찾을 수 없습니다.\",\n"
                                                            + "  \"errorCode\": \"MENU_NOT_FOUND_EX\"\n"
                                                            + "}"),
                                    @ExampleObject(
                                            name = "메뉴 미존재 예시 2",
                                            value =
                                                    "{\n"
                                                            + "  \"success\": false,\n"
                                                            + "  \"message\": \"메뉴를 찾을 수 없습니다.\",\n"
                                                            + "  \"errorCode\": \"MENU_NOT_FOUND_EXCEPTION\"\n"
                                                            + "}")
                                })),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                name = "서버 오류 예시",
                                                value =
                                                        "{\n"
                                                                + "  \"success\": false,\n"
                                                                + "  \"message\": \"서버 내부 오류가 발생했습니다.\",\n"
                                                                + "  \"errorCode\": \"INTERNAL_SERVER_ERROR\"\n"
                                                                + "}")))
    })
    @GetMapping("/{menu-id}/recipe")
    public ResponseEntity<ApiResponse<MenuRecipeResponse>> getRecipe(
            @LoginMember MemberSession member, @PathVariable("menu-id") Long menuId) {

        MenuRecipeResponse response = menuService.getRecipe(member.storeId(), menuId);

        return ApiResponse.success(MENU_GET_SUCCESS, response);
    }

    @Operation(
            summary = "식재료 AI 자동완성 API (한울)",
            description = "입력된 메뉴명을 바탕으로 LLM을 통해 식재료 리스트를 자동으로 생성합니다.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "200",
                description = "레시피 자동완성 성공",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples =
                                        @ExampleObject(
                                                value =
                                                        """
                    {
                      "success": true,
                      "message": "메뉴 레시피 자동 완성에 성공했습니다.",
                      "data": {
                        "menuName": "김치찌개",
                        "ingredients": [
                          { "name": "돼지고기", "quantity": 150, "unit": "G" },
                          { "name": "김치", "quantity": 200, "unit": "G" },
                          { "name": "두부", "quantity": 100, "unit": "G" }
                        ]
                      }
                    }
                    """))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "404",
                description = "메뉴 없음",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "메뉴 미존재 예시",
                                            value =
                                                    "{\n"
                                                            + "  \"success\": false,\n"
                                                            + "  \"message\": \"메뉴를 찾을 수 없습니다.\",\n"
                                                            + "  \"errorCode\": \"MENU_NOT_FOUND_EXCEPTION\"\n"
                                                            + "}")
                                })),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
                responseCode = "500",
                description = "서버 내부 오류",
                content =
                        @Content(
                                mediaType = "application/json",
                                examples = {
                                    @ExampleObject(
                                            name = "외부 API 호출 실패",
                                            summary = "LLM API 호출 중 오류 발생",
                                            value =
                                                    """
                                            {
                                              "success": false,
                                              "message": "외부 서비스 호출 중 오류가 발생했습니다.",
                                              "errorCode": "EXTERNAL_API_ERROR"
                                            }
                                            """),
                                    @ExampleObject(
                                            name = "데이터 파싱 실패",
                                            summary = "AI 응답 결과 추출 실패",
                                            value =
                                                    """
                                            {
                                              "success": false,
                                              "message": "AI 응답 데이터를 추출하는 데 실패했습니다.",
                                              "errorCode": "AI_RESPONSE_PARSE_FAILED"
                                            }
                                            """)
                                }))
    })
    @PostMapping("/{menuId}/auto-complete")
    public ResponseEntity<ApiResponse<MenuRecipeResponse>> autoCompleteIngredients(
            @LoginMember MemberSession member, @PathVariable Long menuId) {

        log.info(
                "AI Auto-complete request received: storeId={}, menuId={}",
                member.storeId(),
                menuId);

        MenuRecipeResponse response = menuService.autoCompleteIngredients(member.storeId(), menuId);

        return ApiResponse.success(MENU_RECIPE_AUTO_COMPLETE_SUCCESS, response);
    }
}
