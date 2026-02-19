package com.checkmate.backend.global.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum SuccessStatus {

    /** Member */
    // 200
    GOOGLE_LOGIN_SUCCESS(HttpStatus.OK, "구글 로그인에 성공했습니다."),
    BUSINESS_VERIFICATION_SUCCESS(HttpStatus.OK, "사업자 인증 성공했습니다."),
    MEMBER_STATUS_SUCCESS(HttpStatus.OK, "사용자 상태 조회에 성공했습니다."),
    LOGOUT_SUCCESS(HttpStatus.OK, "로그아웃에 성공했습니다."),

    // 201
    MEMBER_SIGNUP_SUCCESS(HttpStatus.CREATED, "회원 가입에 성공했습니다"),

    /** JWT & Auth */
    TOKEN_REFRESH_SUCCESS(HttpStatus.OK, "토큰 재발급에 성공했습니다."),

    /** Store */
    // 200
    POS_CONNECT_START(HttpStatus.OK, "POS 연동을 시작합니다."),
    STORE_DELETE_SUCCESS(HttpStatus.OK, "매장을 성공적으로 삭제했습니다."),
    POS_DELETE_SUCCESS(HttpStatus.OK, "POS를 성공적으로 삭제했습니다."),
    STORE_INFO_FETCH_SUCCESS(HttpStatus.OK, "매장 정보 조회에 성공했습니다."),

    // 201
    SEND_PAY_INFO_SAVE_SUCCESS(HttpStatus.CREATED, "결제 정보 등록 성공"),
    STORE_CREATE_SUCCESS(HttpStatus.CREATED, "매장 등록 성공했습니다."),

    /** Menu */
    // 200
    MENU_GET_SUCCESS(HttpStatus.OK, "메뉴 조회에 성공했습니다."),
    INGREDIENT_GET_SUCCESS(HttpStatus.OK, "식재료 조회에 성공했습니다."),
    MENU_RECIPE_AUTO_COMPLETE_SUCCESS(HttpStatus.OK, "메뉴 레시피 자동 완성에 성공했습니다."),
    INGREDIENT_UPDATE_SUCCESS(HttpStatus.OK, "식재료 수정에 성공했습니다."),

    // 201
    MENU_CREATE_SUCCESS(HttpStatus.CREATED, "메뉴 등록에 성공했습니다."),
    INGREDIENT_CREATE_SUCCESS(HttpStatus.CREATED, "식재료 등록에 성공했습니다."),

    /** SSE */
    // 200
    SSE_SUBSCRIBE_SUCCESS(HttpStatus.OK, "SSE 구독에 성공했습니다."),
    SSE_UNSUBSCRIBE_SUCCESS(HttpStatus.OK, "SSE 구독 해제에 성공했습니다."),
    SSE_UNSUBSCRIBE_ALL_SUCCESS(HttpStatus.OK, "모든 SSE 구독을 해제했습니다."),
    SSE_CONNECT_SUCCESS(HttpStatus.OK, "SSE 연결에 성공했습니다."),
    SSE_DISCONNECT_SUCCESS(HttpStatus.OK, "SSE 연결을 종료했습니다."),

    /** Order */
    // 201
    ORDER_RECEIVE_SUCCESS(HttpStatus.CREATED, "주문 수신에 성공했습니다."),

    /** Dashboard */
    // 200
    DASHBOARD_GET_SUCCESS(HttpStatus.OK, "대시보드 조회에 성공했습니다."),
    DASHBOARD_UPDATE_SUCCESS(HttpStatus.OK, "대시보드 수정에 성공했습니다."),
    DASHBOARD_DELETE_SUCCESS(HttpStatus.OK, "대시보드 삭제에 성공했습니다."),
    DASHBOARD_LAYOUT_UPDATE_SUCCESS(HttpStatus.OK, "대시보드 레이아웃 저장에 성공했습니다."),
    DASHBOARD_LAYOUT_GET_SUCCESS(HttpStatus.OK, "대시보드 레이아웃 조회에 성공했습니다."),

    // 201
    DASHBOARD_CREATE_SUCCESS(HttpStatus.CREATED, "대시보드 등록에 성공했습니다."),

    /** Analysis */
    // 200
    ANALYSIS_CARD_GET_SUCCESS(HttpStatus.OK, "지표 카드 조회에 성공했습니다."),

    /** Report */
    // 200
    REPORT_GET_SUCCESS(HttpStatus.OK, "리포트 조회에 성공했습니다."),
    REPORT_CALENDAR_GET_SUCCESS(HttpStatus.OK, "캘린더 조회에 성공했습니다."),

    NOTIFICATION_STATUS_GET_SUCCESS(HttpStatus.OK, "미열람 알림 상태 조회를 완료했습니다."),
    NOTIFICATION_LIST_GET_SUCCESS(HttpStatus.OK, "알림 목록 조회를 완료했습니다."),
    NOTIFICATION_READ_SUCCESS(HttpStatus.OK, "알림을 모두 읽음 처리했습니다."),
    NOTIFICATION_DELETE_SUCCESS(HttpStatus.OK, "알림을 모두 삭제했습니다."),

    /** Chat */
    // 200
    CHAT_GET_SUCCESS(HttpStatus.OK, "AI 응답 생성에 성공했습니다."),
    ;

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
