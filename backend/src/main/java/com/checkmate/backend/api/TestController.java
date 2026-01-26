package com.checkmate.backend.api;

import com.checkmate.backend.global.exception.BadRequestException;
import com.checkmate.backend.global.exception.InternalServerException;
import com.checkmate.backend.global.exception.NotFoundException;
import com.checkmate.backend.global.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.checkmate.backend.global.response.ErrorStatus.*;
import static com.checkmate.backend.global.response.SuccessStatus.TEST_RESPONSE_SUCCESS;

@Tag(name = "Test", description =
        "테스트 관련 API 입니다."
)
@RestController
@RequestMapping("/api/v1/test")
public class TestController {

    @Operation(
            summary = "테스트 API (용범)",
            description =
                    "여기는 description 입니다."
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "응답 성공!"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "4XX", description = "예외 메시지입니다!"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "여기도 예외 메시지입니다!"),
    })
    @GetMapping
    public ResponseEntity<ApiResponse<TestResponseDTO>> test(@RequestBody TestRequestDTO testRequestDTO) {
        TestResponseDTO response = new TestResponseDTO(3231, "문자열입니다.");

        return ApiResponse.success(TEST_RESPONSE_SUCCESS, response);
    }

    @Operation(
            summary = "400 응답 테스트 API (용범)",
            description =
                    "여기는 description 입니다."
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "테스트 응답 성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "요청 값이 입력되지 않았습니다.")
    })
    @GetMapping("/400")
    public ResponseEntity<ApiResponse<Void>> error400() {

        throw new BadRequestException(VALIDATION_REQUEST_MISSING_EXCEPTION);
    }

    @Operation(
            summary = "404 응답 테스트 API (용범)",
            description =
                    "여기는 description 입니다."
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "테스트 응답 성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "해당 결제 정보를 찾을 수 없습니다.")
    })
    @GetMapping("/404")
    public ResponseEntity<ApiResponse<Void>> error404() {

        throw new NotFoundException(PAYMENT_INFO_NOT_FOUND_EXCEPTION);
    }

    @Operation(
            summary = "500 응답 테스트 API (용범)",
            description =
                    "여기는 description 입니다."
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "테스트 응답 성공"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "서버 내부 오류가 발생했습니다.")
    })
    @GetMapping("/500")
    public ResponseEntity<ApiResponse<Void>> error500() {

        throw new InternalServerException(INTERNAL_SERVER_EXCEPTION);
    }
}

