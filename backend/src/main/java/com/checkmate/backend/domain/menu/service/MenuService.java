package com.checkmate.backend.domain.menu.service;

import static com.checkmate.backend.global.response.ErrorStatus.*;

import com.checkmate.backend.domain.menu.dto.IngredientCommand;
import com.checkmate.backend.domain.menu.dto.request.IngredientCreateRequestDTO;
import com.checkmate.backend.domain.menu.dto.request.MenuCreateRequestDTO;
import com.checkmate.backend.domain.menu.dto.response.MenuCategoryResponseDTO;
import com.checkmate.backend.domain.menu.dto.response.MenuRecipeResponse;
import com.checkmate.backend.domain.menu.dto.response.MenuResponseDTO;
import com.checkmate.backend.domain.menu.entity.Ingredient;
import com.checkmate.backend.domain.menu.entity.Menu;
import com.checkmate.backend.domain.menu.entity.MenuVersion;
import com.checkmate.backend.domain.menu.entity.Recipe;
import com.checkmate.backend.domain.menu.enums.Unit;
import com.checkmate.backend.domain.menu.repository.IngredientRepository;
import com.checkmate.backend.domain.menu.repository.MenuRepository;
import com.checkmate.backend.domain.menu.repository.MenuVersionRepository;
import com.checkmate.backend.domain.menu.repository.RecipeRepository;
import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import com.checkmate.backend.global.client.llm.LlmClient;
import com.checkmate.backend.global.client.llm.PromptProvider;
import com.checkmate.backend.global.exception.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import java.util.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MenuService {
    private final StoreRepository storeRepository;
    private final MenuRepository menuRepository;
    private final MenuVersionRepository menuVersionRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeRepository recipeRepository;

    private final LlmClient llmClient;
    private final PromptProvider promptProvider;
    private final ObjectMapper objectMapper;

    /*
     * create
     * */

    @Transactional
    public void registerMenus(Long storeId, MenuCreateRequestDTO menuCreateRequestDTO) {

        Store store =
                storeRepository
                        .findById(storeId)
                        .orElseThrow(
                                () -> {
                                    log.warn(
                                            "[registerMenus][store is not found][storeId= {}]",
                                            storeId);
                                    return new NotFoundException(STORE_NOT_FOUND_EXCEPTION);
                                });

        List<MenuCreateRequestDTO.MenuCreateDTO> menuDTOs =
                Optional.ofNullable(menuCreateRequestDTO.menus()).orElse(List.of());

        for (MenuCreateRequestDTO.MenuCreateDTO dto : menuDTOs) {

            Menu menu = dto.toEntity(store);
            menuRepository.save(menu);

            MenuVersion menuVersion =
                    MenuVersion.builder().price(dto.price()).active(true).menu(menu).build();

            menuVersionRepository.save(menuVersion);
        }
    }

    @Transactional
    public void addIngredientsToMenu(
            Long storeId, Long menuId, IngredientCreateRequestDTO ingredientCreateRequestDTO) {

        MenuVersion menuVersion =
                menuVersionRepository
                        .findMenuVersionByMenuIdWithMenuAndStore(menuId)
                        .orElseThrow(
                                () -> {
                                    log.warn(
                                            "[addIngredientsToMenu][menu is not found][menuId= {}]",
                                            menuId);
                                    return new NotFoundException(MENU_NOT_FOUND_EXCEPTION);
                                });

        boolean recipeAlreadyExists = recipeRepository.existsByMenuVersionId(menuVersion.getId());

        if (recipeAlreadyExists) {
            log.warn(
                    "[addIngredientsToMenu][이미 레시피가 등록된 메뉴입니다. menuVersionId= {}]",
                    menuVersion.getId());
            throw new ConflictException(MENU_RECIPE_ALREADY_EXISTS);
        }

        Long menuStoreId = menuVersion.getMenu().getStore().getId();

        if (!storeId.equals(menuStoreId)) {
            log.warn(
                    "[addIngredientsToMenu][menu access denied][currentStoreId={}, menuStoreId={}]",
                    storeId,
                    menuStoreId);
            throw new ForbiddenException(MENU_ACCESS_DENIED);
        }

        /*
         * 레시피 등록
         *
         * 식재료 없으면 insert 있으면 그거 사용해야 함.
         * */
        List<IngredientCreateRequestDTO.Ingredient> ingredientDTOs =
                Optional.ofNullable(ingredientCreateRequestDTO.ingredients()).orElse(List.of());

        for (IngredientCreateRequestDTO.Ingredient dto : ingredientDTOs) {
            Unit unit = dto.unit();
            String baseUnit = unit.baseUnitValue();

            ingredientRepository.insertIgnore(storeId, dto.name(), baseUnit);

            Ingredient ingredient =
                    ingredientRepository
                            .findIngredientByStoreIdAndName(storeId, dto.name())
                            .orElseThrow(
                                    () -> {
                                        log.warn(
                                                "[addIngredientsToMenu][Ingredient is not found][storeId={}, name={}]",
                                                storeId,
                                                dto.name());
                                        return new ForbiddenException(
                                                INGREDIENT_NOT_FUND_EXCEPTION);
                                    });

            Integer quantity = dto.quantity();

            recipeRepository.save(
                    Recipe.builder()
                            .quantity(quantity)
                            .quantityNormalized(unit.normalize(quantity))
                            .unit(unit.getValue())
                            .menuVersion(menuVersion)
                            .ingredient(ingredient)
                            .build());
        }
    }

    private void registerRecipes(
            Long storeId,
            MenuVersion menuVersion,
            List<? extends IngredientCommand> ingredientDTOs) {

        for (IngredientCommand dto : ingredientDTOs) {

            Unit unit = dto.unit();
            String baseUnit = unit.baseUnitValue();

            ingredientRepository.insertIgnore(storeId, dto.name(), baseUnit);

            Ingredient ingredient =
                    ingredientRepository
                            .findIngredientByStoreIdAndName(storeId, dto.name())
                            .orElseThrow(
                                    () -> {
                                        log.warn(
                                                "[registerRecipes][ingredient not found][storeId={}, name={}]",
                                                storeId,
                                                dto.name());
                                        return new ForbiddenException(
                                                INGREDIENT_NOT_FUND_EXCEPTION);
                                    });

            recipeRepository.save(
                    Recipe.builder()
                            .quantity(dto.quantity())
                            .quantityNormalized(unit.normalize(dto.quantity()))
                            .unit(unit.getValue())
                            .menuVersion(menuVersion)
                            .ingredient(ingredient)
                            .build());
        }
    }

    /*
     * read
     * */

    public List<MenuCategoryResponseDTO> getMenus(Long storeId) {

        // 1. 메뉴 조회
        List<Menu> menus = menuRepository.findAllByStoreId(storeId);
        List<Long> menuIds = menus.stream().map(Menu::getId).toList();

        // 2. 메뉴 버전 조회
        List<MenuVersion> menuVersions =
                menuVersionRepository.findMenuVersionsByMenuIdsWithMenu(menuIds);

        // 3. 식자재 등록된 menuVersion id 조회
        Set<Long> menuVersionIdsWithRecipe =
                new HashSet<>(
                        recipeRepository.findMenuVersionIdsWithRecipe(
                                menuVersions.stream().map(MenuVersion::getId).toList()));

        // 4. category 기준으로 MenuVersion 묶기
        Map<String, List<MenuVersion>> categoryMap = new HashMap<>();
        for (MenuVersion menuVersion : menuVersions) {
            String category = menuVersion.getMenu().getCategory();
            categoryMap.computeIfAbsent(category, k -> new ArrayList<>()).add(menuVersion);
        }

        // 5. Category DTO로 변환
        List<MenuCategoryResponseDTO> response = new ArrayList<>();

        for (Map.Entry<String, List<MenuVersion>> entry : categoryMap.entrySet()) {
            String category = entry.getKey();
            List<MenuVersion> versions = entry.getValue();

            List<MenuResponseDTO> menuResponses = new ArrayList<>();
            for (MenuVersion menuVersion : versions) {
                boolean hasIngredients = menuVersionIdsWithRecipe.contains(menuVersion.getId());

                menuResponses.add(MenuResponseDTO.of(menuVersion, hasIngredients));
            }

            response.add(MenuCategoryResponseDTO.of(category, menuResponses));
        }

        return response;
    }

    /** 메뉴 레시피 조회 */
    public MenuRecipeResponse getRecipe(Long storeId, Long menuId) {
        // 소유권 검증
        Menu menu =
                menuRepository
                        .findMenuByMenuIdWithStore(menuId)
                        .orElseThrow(
                                () -> {
                                    log.warn("[getRecipe][menu is not found][menuId={}]", menuId);
                                    return new NotFoundException(MENU_NOT_FOUND_EXCEPTION);
                                });

        if (!storeId.equals(menu.getStore().getId())) {
            log.warn(
                    "[getRecipe][menu access denied][request storeId={}, storeId of menu= {}]",
                    storeId,
                    menu.getStore().getId());
            throw new ForbiddenException(MENU_ACCESS_DENIED);
        }

        MenuVersion menuVersion =
                menuVersionRepository
                        .findActiveMenuVersionByMenuId(menuId)
                        .orElseThrow(
                                () -> {
                                    log.warn(
                                            "[getRecipe][active menu version not found][menuId={}]",
                                            menuId);
                                    return new NotFoundException(MENU_NOT_FOUND_EXCEPTION);
                                });

        List<Recipe> recipes = recipeRepository.findRecipesByMenuVersionId(menuVersion.getId());

        List<MenuRecipeResponse.IngredientResponse> ingredientResponses =
                recipes.stream().map(MenuRecipeResponse.IngredientResponse::of).toList();

        MenuRecipeResponse response = MenuRecipeResponse.of(menu, ingredientResponses);

        return response;
    }

    public MenuRecipeResponse autoCompleteIngredients(Long storeId, Long menuId) {
        Menu menu =
                menuRepository
                        .findMenuByMenuIdWithStore(menuId)
                        .orElseThrow(
                                () -> {
                                    log.warn(
                                            "[autoCompleteIngredients][menu not found][menuId={}]",
                                            menuId);
                                    return new NotFoundException(MENU_NOT_FOUND_EXCEPTION);
                                });

        if (!storeId.equals(menu.getStore().getId())) {
            throw new ForbiddenException(MENU_ACCESS_DENIED);
        }

        String template = promptProvider.getPrompt(PromptProvider.PromptType.MENU_INGREDIENTS);
        String aiAnswer = llmClient.generateIngredients(template, menu.getName());

        try {
            MenuRecipeResponse aiResponse =
                    objectMapper.readValue(aiAnswer, MenuRecipeResponse.class);

            List<MenuRecipeResponse.IngredientResponse> aiIngredients = aiResponse.ingredients();

            return MenuRecipeResponse.of(menu, aiIngredients);
        } catch (JsonProcessingException e) {
            log.error(
                    "[autoCompleteIngredients] AI 응답 파싱 실패. 메뉴: {}, 응답: {}",
                    menu.getName(),
                    aiAnswer);
            throw new InternalServerException(AI_RESPONSE_PARSE_FAILED);
        }
    }
}
