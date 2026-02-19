import { API_BASE_URL } from '@/constants/shared';

import { ApiError, createApiError } from './apiError';
import { authToken } from './authToken';

/**
 * API 클라이언트 인스턴스 생성을 위한 설정 옵션
 * @interface CreateApiClientConfig
 * @property {string} [baseURL] - 모든 API 요청의 기본 URL. VITE_API_URL 환경 변수 또는 빈 문자열로 기본값 설정
 * @property {number} [timeout=10000] - 요청 타임아웃 시간(밀리초). 기본값은 10000ms이며, 이 시간을 초과하면 요청이 중단됨
 * @property {Record<string, string>} [headers] - 모든 요청에 포함할 기본 헤더. 'Content-Type: application/json'과 병합됨
 * @property {Function} [requestInterceptor] - 요청 전송 전에 호출되는 선택적 함수. Request 객체를 받아 수정된 Request를 반환해야 함. 인증 헤더 추가, 로깅 등에 유용
 * @property {Function} [responseSuccessInterceptor] - 응답 수신 후 호출되는 선택적 함수(상태 코드 무관). Response 객체를 받아 Response를 반환해야 함. 응답 변환, 로깅 등에 유용
 * @property {Function} [responseErrorInterceptor] - 응답 상태가 ok가 아닐 때(!response.ok) 호출되는 선택적 함수. Response 객체를 받아 Response를 반환해야 함. 에러 처리, 로깅 등에 유용
 */
interface CreateApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  requestInterceptor?: (request: Request) => Promise<Request> | Request;
  responseSuccessInterceptor?: (
    response: Response,
  ) => Promise<Response> | Response;
  responseErrorInterceptor?: (
    request: Request,
    response: Response,
  ) => Promise<Response> | Response;
}

/**
 * API 요청을 위한 파라미터
 * @interface ApiClientProps
 * @property {string} url - 엔드포인트 경로 (baseURL에 추가됨)
 * @property {RequestInit} [options] - 선택적 fetch API 옵션. 클라이언트 기본값과 병합되며, signal은 타임아웃 처리를 위해 오버라이드됨
 */
interface ApiClientProps {
  url: string;
  options?: RequestInit;
}

/**
 * 표준 API 응답 구조 (수정 필요)
 * @interface ApiResponse
 * @template T - 응답 본문의 데이터 타입
 * @property {boolean} success - 요청 성공 여부
 * @property {string} message - 응답 메시지
 * @property {string} errorCode - 에러 코드
 */
export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface SuccessResponse<T = unknown> extends ApiResponse {
  success: true;
  data: T;
}

export interface ErrorResponse extends ApiResponse {
  success: false;
  errorCode: string;
}

const handleSuccessResponse = async <T>(
  response: Response,
  responseSuccessInterceptor: CreateApiClientConfig['responseSuccessInterceptor'],
): Promise<SuccessResponse<T>> => {
  if (responseSuccessInterceptor) {
    response = await responseSuccessInterceptor(response);
  }

  const data = (await response.json()) as SuccessResponse<T>;
  return {
    ...data,
  };
};

/**
 * 선택적 인터셉터와 타임아웃 처리가 포함된 설정된 API 클라이언트 함수를 생성합니다.
 *
 * 반환된 클라이언트 함수는 다음을 처리합니다:
 * - 자동 요청/응답 인터셉션
 * - 요청 타임아웃 및 자동 중단
 * - HTTP 에러 상태 감지
 * - JSON 파싱 및 응답 래핑
 *
 * @template T - 타입 안전한 응답을 위해 반환된 클라이언트 함수에서 사용 가능한 제네릭 타입
 * @param {CreateApiClientConfig} [config={}] - 클라이언트의 설정 옵션
 * @returns {Function} ApiClientProps를 받아 Promise<SuccessResponse<T>>를 반환하는 비동기 함수.
 *                    네트워크 실패, 타임아웃 또는 기타 요청 오류 시 Error를 throw합니다.
 *
 * @example
 * // 기본 클라이언트 생성
 * const client = createApiClient({ baseURL: 'https://api.example.com' });
 * const response = await client({ url: '/users/123' });
 *
 * @example
 * // 인터셉터를 포함한 클라이언트 생성
 * const client = createApiClient({
 *   baseURL: 'https://api.example.com',
 *   timeout: 5000,
 *   requestInterceptor: async (request) => {
 *     // 인증 헤더 추가 또는 로깅
 *     request.headers.set('X-Request-ID', generateId());
 *     return request;
 *   },
 *   responseSuccessInterceptor: async (response) => {
 *     // 성공 응답 로깅
 *     console.log(`성공: ${response.status}`);
 *     return response;
 *   },
 *   responseErrorInterceptor: async (response) => {
 *     // 에러 처리
 *     console.error(`에러: ${response.status}`);
 *     return response;
 *   }
 * });
 *
 * @example
 * // 타입 지정 응답으로 클라이언트 사용
 * interface User {
 *   id: number;
 *   name: string;
 * }
 *
 * const user = await client<User>({ url: '/users/123' });
 * console.log(user.data.name); // TypeScript는 이것이 string임을 알고 있음
 *
 * @throws {Error} 요청이 타임아웃 시간을 초과하면 "Request timeout"
 * @throws {Error} 네트워크 오류 또는 기타 fetch 실패는 그대로 전파됨
 */
const DEFAULT_TIMEOUT_MS = 10000;
export const createApiClient = ({
  baseURL = API_BASE_URL,
  timeout = DEFAULT_TIMEOUT_MS,
  requestInterceptor,
  responseSuccessInterceptor,
  responseErrorInterceptor,
}: CreateApiClientConfig = {}) => {
  return async function apiClient<T>({
    url,
    options = {},
  }: ApiClientProps): Promise<SuccessResponse<T>> {
    /* request 객체 생성 */
    const _url = `${baseURL}${url}`;

    const controller = new AbortController();

    const _options: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json', // json
        ...options.headers,
      },
      credentials: 'include',
      signal: controller.signal, // timeout
    };

    const externalSignal = options.signal;
    if (externalSignal?.aborted) {
      controller.abort();
    }

    const handleExternalAbort = () => {
      controller.abort();
    };
    externalSignal?.addEventListener('abort', handleExternalAbort, {
      once: true,
    });

    let request = new Request(_url, _options);

    /* request 인터셉터 호출 */
    if (requestInterceptor) {
      request = await requestInterceptor(request);
    }

    /* 재요청(retry) 등을 위해 미리 복제 (fetch 후에는 body가 소모되어 clone 불가) */
    const clonedRequest = request.clone();

    /* fetch 호출 w/ timeout */
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
    let response: Response;
    try {
      const fetchPromise = fetch(request);
      const timeoutPromise = new Promise<Response>((_, reject) => {
        timeoutId = setTimeout(() => {
          controller.abort();
          reject(new ApiError('Request timeout', 504, 'TIMEOUT_ERROR'));
        }, timeout);
      });

      response = await Promise.race([fetchPromise, timeoutPromise]);
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      externalSignal?.removeEventListener('abort', handleExternalAbort);
    }

    /* response HTTP 에러 시 인터셉터 호출 */
    if (!response.ok) {
      if (responseErrorInterceptor) {
        response = await responseErrorInterceptor(clonedRequest, response);
      }
      // responseErrorInterceptor 호출 후 해당 요청이 성공한 경우
      if (response.ok) {
        return await handleSuccessResponse<T>(
          response,
          responseSuccessInterceptor,
        );
      }

      throw await createApiError(response);
    }

    /* response 성공 시 인터셉터 호출 */
    return await handleSuccessResponse<T>(response, responseSuccessInterceptor);
  };
};

/**
 * 기본 설정으로 미리 구성된 API 클라이언트
 * 공개 인증 없음 API 엔드포인트에 적합합니다.
 *
 * @example
 * const data = await basicApiClient({ url: '/posts' });
 */
const basicApiClient = createApiClient();

/**
 * JWT 인증이 포함된 미리 구성된 API 클라이언트
 * localStorage의 Bearer 토큰을 모든 요청에 자동으로 추가합니다.
 *
 * 토큰은 각 요청 시 localStorage['bearer']에서 읽어집니다.
 * 토큰을 찾을 수 없으면 Authorization 헤더 없이 요청이 진행됩니다.
 *
 * 인증이 필요한 API 엔드포인트에 적합합니다.
 *
 * @example
 * localStorage.setItem('bearer', 'eyJhbGc...');
 * const userData = await authorizedApiClient({ url: '/user/profile' });
 */
const authorizedApiClient = createApiClient({
  requestInterceptor: async (request) => await authToken.insert(request),
  responseErrorInterceptor: async (request, response) =>
    await authToken.reissue(request, response),
});

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const createHttpMethodWrapper = (
  client: ReturnType<typeof createApiClient>,
) => {
  const request = <T>(
    method: HttpMethod,
    url: string,
    options: RequestInit = {},
  ) =>
    client<T>({
      url,
      options: {
        ...options,
        method,
      },
    });

  return {
    get: <T>(url: string, options: RequestInit = {}) =>
      request<T>('GET', url, options),
    post: <T>(url: string, options: RequestInit = {}) =>
      request<T>('POST', url, options),
    put: <T>(url: string, options: RequestInit = {}) =>
      request<T>('PUT', url, options),
    patch: <T>(url: string, options: RequestInit = {}) =>
      request<T>('PATCH', url, options),
    delete: <T>(url: string, options: RequestInit = {}) =>
      request<T>('DELETE', url, options),
  };
};

export const basicApi = createHttpMethodWrapper(basicApiClient);
export const authorizedApi = createHttpMethodWrapper(authorizedApiClient);
