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

    // 403
    STORE_NOT_REGISTERED(HttpStatus.FORBIDDEN, "등록된 매장이 없습니다. 매장 등록 후 이용해주세요."),

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
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.UNAUTHORIZED, "리프레시 토큰이 존재하지 않습니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 리프레시 토큰입니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 리프레시 토큰입니다."),
    REFRESH_TOKEN_MISMATCH(HttpStatus.UNAUTHORIZED, "저장된 리프레시 토큰과 일치하지 않습니다."),

    // 403
    FORBIDDEN_ACCESS(HttpStatus.FORBIDDEN, "접근 권한이 없습니다."),

    /** Store* */

    // 400
    SSE_CONNECTION_REQUIRED(HttpStatus.BAD_REQUEST, "포스 연동 전 SSE 연결이 필요합니다."),
    STORE_ALREADY_REGISTERED(HttpStatus.BAD_REQUEST, "이미 매장을 등록하셨습니다."),
    // 404
    STORE_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, "매장을 찾을 수 없습니다."),

    /** Menu */
    // 403
    MENU_ACCESS_DENIED(HttpStatus.FORBIDDEN, "메뉴에 접근할 권한이 없습니다."),
    // 404
    MENU_NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, "메뉴를 찾을 수 없습니다."),
    INGREDIENT_NOT_FUND_EXCEPTION(HttpStatus.NOT_FOUND, "식자재를 찾을 수 없습니다."),

    // 409
    MENU_RECIPE_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 식자재(레시피)가 등록된 메뉴입니다."),

    /** Dashboard */
    // 400
    DASHBOARD_LIMIT_EXCEEDED(HttpStatus.BAD_REQUEST, "대시보드는 최대 5개까지 생성 가능합니다."),
    INVALID_DASHBOARD_NAME(HttpStatus.BAD_REQUEST, "유효하지 않은 대시보드 이름입니다."),
    DASHBOARD_NAME_TOO_LONG(HttpStatus.BAD_REQUEST, "대시보드 이름은 최대 6자까지 입력 가능합니다."),
    DUPLICATE_DASHBOARD_NAME(HttpStatus.BAD_REQUEST, "이미 존재하는 대시보드 이름입니다."),
    DEFAULT_DASHBOARD_MODIFICATION_RESTRICTED(HttpStatus.BAD_REQUEST, "기본 대시보드는 수정할 수 없습니다."),
    DEFAULT_DASHBOARD_DELETE_RESTRICTED(HttpStatus.BAD_REQUEST, "기본 대시보드는 삭제할 수 없습니다."),
    DUPLICATE_CARD_TYPE(HttpStatus.BAD_REQUEST, "중복된 카드 타입이 존재합니다."),
    INVALID_DASHBOARD_CARD_POSITION(HttpStatus.BAD_REQUEST, "유효하지 않은 카드 위치입니다."),
    DUPLICATE_CARD_POSITION(HttpStatus.BAD_REQUEST, "카드 위치가 겹칩니다."),
    INVALID_CARD_TYPE(HttpStatus.BAD_REQUEST, "유효하지 않은 카드 타입입니다."),

    // 403
    DASHBOARD_ACCESS_DENIED(HttpStatus.FORBIDDEN, "해당 대시보드에 접근할 권한이 없습니다."),

    // 404
    DASHBOARD_NOT_FOUND(HttpStatus.NOT_FOUND, "대시보드를 찾을 수 없습니다."),

    /** Analysis */
    // 400
    UNSUPPORTED_ANALYSIS_CARD(HttpStatus.BAD_REQUEST, "지원하지 않는 지표 카드 ID입니다."),

    /** Report */
    // 404
    REPORT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 날짜의 리포트를 찾을 수 없습니다."),

    /** Client */
    // 500
    AI_RESPONSE_PARSE_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "AI 응답 데이터를 추출하는 데 실패했습니다."),
    EXTERNAL_API_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "외부 서비스 호출 중 오류가 발생했습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String message;

    public int getStatusCode() {
        return this.httpStatus.value();
    }
}
