package com.checkmate.backend.domain.menu.repository;

import com.checkmate.backend.domain.menu.entity.Ingredient;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    /*
     * create
     * */

    @Modifying
    @Transactional
    @Query(
            value =
                    """
            INSERT INTO ingredient (store_id, name, base_unit, created_at, updated_at)
            VALUES (:storeId, :name, :baseUnit, now(), now())
            ON CONFLICT (store_id, name) DO NOTHING
        """,
            nativeQuery = true)
    void insertIgnore(
            @Param("storeId") Long storeId,
            @Param("name") String name,
            @Param("baseUnit") String baseUnit);

    /*
     * read
     * */

    @Query("select i from Ingredient i" + " where i.store.id=:storeId and i.name=:name")
    Optional<Ingredient> findIngredientByStoreIdAndName(
            @Param("storeId") Long storeId, @Param("name") String name);

    @Query(
            "select i.name from Ingredient i"
                    + " where i.store.id=:storeId and i.name like concat('%', :keyword, '%')")
    List<String> findNameByStoreIdAndKeyword(
            @Param("storeId") Long storeId, @Param("keyword") String keyword);

    @Query("select i from Ingredient i where i.id in :ingredientIds")
    List<Ingredient> findAllByIds(@Param("ingredientIds") List<Long> ingredientIds);

    @Query("select count(i)>0 from Ingredient i" + " where i.store.id=:storeId")
    boolean existsIngredientsByStoreId(@Param("storeId") Long storeId);
}
