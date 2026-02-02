package com.checkmate.backend.global.response;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PROTECTED)
public enum ErrorStatus {

    /** Common */
    // 400
    VALIDATION_REQUEST_MISSING_EXCEPTION(HttpStatus.BAD_REQUEST, "요청 값이 입력되지 않았습니다."),
    VALIDATION_EXCEPTION(HttpStatus.BAD_REQUEST, "요청 값이 올바르지 않습니다."),
    BUSINESS_NUMBER_INVALID_EXCEPTION(HttpStatus.BAD_REQUEST, "유효하지 않은 사업자번호입니다."),

    // 500
    INTERNAL_SERVER_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류가 발생했습니다."),
    ENCRYPTION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "암호화에 실패했습니다."),
    DECRYPTION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "복호화에 실패했습니다."),

    /** Member */
    // 400
    INVALID_OAUTH_STATE(HttpStatus.BAD_REQUEST, "유효하지 않은 OAuth state 파라미터입니다."),
    INVALID_ID_TOKEN(HttpStatus.BAD_REQUEST, "유효하지 않은 ID 토큰입니다."),

    // 404
    MEMBER_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, "해당 사용자를 찾을 수 없습니다."),

    // 500
    GOOGLE_TOKEN_EXCHANGE_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "구글 토큰 교환에 실패했습니다."),
    ID_TOKEN_VERIFICATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "ID 토큰 검증에 실패했습니다."),

    /** JWT & Auth */
    // 401
    INVALID_JWT_SIGNATURE(HttpStatus.UNAUTHORIZED, "유효하지 않은 JWT 서명입니다."),
    EXPIRED_JWT_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 JWT 토큰입니다."),
    UNSUPPORTED_JWT_TOKEN(HttpStatus.UNAUTHORIZED, "지원되지 않는 JWT 토큰입니다."),
    INVALID_JWT_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 JWT 토큰입니다."),
    JWT_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "JWT 토큰이 존재하지 않습니다."),
    UNAUTHORIZED_ACCESS(HttpStatus.UNAUTHORIZED, "인증되지 않은 접근입니다."),
    BUSINESS_AUTH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "사업자 인증 토큰이 존재하지 않습니다."),
    EXPIRED_BUSINESS_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 사업자 인증 토큰입니다."),
    INVALID_BUSINESS_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 사업자 인증 토큰입니다."),

    // 403
    FORBIDDEN_ACCESS(HttpStatus.FORBIDDEN, "접근 권한이 없습니다."),

    /** Store* */
    // 404
    STORE_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, "매장을 찾을 수 없습니다."),

    /** Menu */
    // 403
    MENU_ACCESS_DENIED(HttpStatus.FORBIDDEN, "메뉴에 접근할 권한이 없습니다."),
    // 404
    MENU_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, "메뉴를 찾을 수 없습니다."),
    INGREDIENT_NOT_FUND_EXCEPTION(HttpStatus.NOT_FOUND, "식자재를 찾을 수 없습니다."),

    // 409
    MENU_RECIPE_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 식자재(레시피)가 등록된 메뉴입니다.");
    ;

    private final HttpStatus httpStatus;
    private final String message;

    public int getStatusCode() {
        return this.httpStatus.value();
    }
}
