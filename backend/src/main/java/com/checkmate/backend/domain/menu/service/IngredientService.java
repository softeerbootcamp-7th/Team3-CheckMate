package com.checkmate.backend.domain.menu.service;

import static com.checkmate.backend.global.response.ErrorStatus.STORE_NOT_FOUND_EXCEPTION;

import com.checkmate.backend.domain.menu.repository.IngredientRepository;
import com.checkmate.backend.domain.store.entity.Store;
import com.checkmate.backend.domain.store.repository.StoreRepository;
import com.checkmate.backend.global.exception.NotFoundException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class IngredientService {
    private final IngredientRepository ingredientRepository;
    private final StoreRepository storeRepository;

    /*
     * read
     * */

    public List<String> getNamesByKeyword(Long memberId, String keyword) {
        Store store =
                storeRepository
                        .findStoreByMemberId(memberId)
                        .orElseThrow(
                                () -> {
                                    log.warn(
                                            "[getNamesByKeyword][store is not found][memberId= {}]",
                                            memberId);
                                    return new NotFoundException(STORE_NOT_FOUND_EXCEPTION);
                                });

        List<String> response =
                ingredientRepository.findNameByStoreIdAndKeyword(store.getId(), keyword);

        return response;
    }
}
