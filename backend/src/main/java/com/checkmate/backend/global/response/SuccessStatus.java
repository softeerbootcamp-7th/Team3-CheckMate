package com.checkmate.backend.global.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum SuccessStatus {


    /** Member */
    // 200
    GOOGLE_LOGIN_SUCCESS(HttpStatus.OK, "구글 로그인에 성공했습니다."),
    BUSINESS_VERIFICATION_SUCCESS(HttpStatus.OK, "사업자 인증 성공했습니다."),

    // 201
    MEMBER_SIGNUP_SUCCESS(HttpStatus.CREATED, "회원 가입에 성공했습니다"),

    /** JWT & Auth */
    TOKEN_REFRESH_SUCCESS(HttpStatus.OK, "토큰 재발급에 성공했습니다."),

    /** Store */
    // 200

    // 201
    SEND_PAY_INFO_SAVE_SUCCESS(HttpStatus.CREATED, "결제 정보 등록 성공"),
    STORE_CREATE_SUCCESS(HttpStatus.CREATED, "매장 등록 성공했습니다."),

    /** Menu */
    // 200
    MENU_GET_SUCCESS(HttpStatus.OK, "메뉴 조회에 성공했습니다."),
    INGREDIENT_GET_SUCCESS(HttpStatus.OK, "식재료 조회에 성공했습니다."),

    // 201
    MENU_CREATE_SUCCESS(HttpStatus.CREATED, "메뉴 등록에 성공했습니다."),
    INGREDIENT_CREATE_SUCCESS(HttpStatus.CREATED, "식재료 등록에 성공했습니다.");

    private final HttpStatus httpStatus;
    private final String message;

    SuccessStatus(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public int getStatusCode() {
        return this.httpStatus.value();
    }
}
