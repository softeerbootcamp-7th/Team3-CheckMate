package com.checkmate.backend.domain.menu.repository;

import com.checkmate.backend.domain.menu.entity.Recipe;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query(
            "select recipe.menuVersion.id from Recipe recipe"
                    + " where recipe.menuVersion.id in :menuVersionIds"
                    + " group by recipe.menuVersion.id")
    List<Long> findMenuVersionIdsWithRecipe(List<Long> menuVersionIds);

    @Query("select count(*)>0 from Recipe recipe" + " where recipe.menuVersion.id=:menuVersionId")
    boolean existsByMenuVersionId(@Param("menuVersionId") Long menuVersionId);

    @Query(
            "select recipe from Recipe recipe"
                    + " join fetch recipe.ingredient"
                    + " where recipe.menuVersion.id=:menuVersionId")
    List<Recipe> findRecipesByMenuVersionId(@Param("menuVersionId") Long menuVersion);
}
