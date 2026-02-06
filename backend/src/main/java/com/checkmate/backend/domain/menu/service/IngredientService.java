package com.checkmate.backend.domain.menu.service;

import com.checkmate.backend.domain.menu.repository.IngredientRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    /*
     * read
     * */

    public List<String> getNamesByKeyword(Long storeId, String keyword) {

        List<String> response = ingredientRepository.findNameByStoreIdAndKeyword(storeId, keyword);

        return response;
    }
}
