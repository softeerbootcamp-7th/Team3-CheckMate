interface CreateApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  requestInterceptor?: (request: Request) => Promise<Request> | Request;
  responseSuccessInterceptor?: (
    response: Response,
  ) => Promise<Response> | Response;
  responseErrorInterceptor?: (
    response: Response,
  ) => Promise<Response> | Response;
}

interface ApiClientProps {
  url: string;
  options?: RequestInit;
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

export const createApiClient = ({
  baseURL = import.meta.env.VITE_API_URL ?? '',
  timeout = 10000,
  requestInterceptor,
  responseSuccessInterceptor,
  responseErrorInterceptor,
}: CreateApiClientConfig = {}) => {
  return async function apiClient<T>({
    url,
    options = {},
  }: ApiClientProps): Promise<ApiResponse<T>> {
    /* request 객체 생성 */
    const _url = `${baseURL}${url}`;

    const controller = new AbortController();
    const _options: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json', // json
        ...options.headers,
      },
      signal: controller.signal, // timeout
    };

    let request = new Request(_url, _options);

    /* request 인터셉터 호출 */
    if (requestInterceptor) {
      request = await requestInterceptor(request);
    }

    /* fetch 호출 w/ timeout */
    let response: Response;
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
    const fetchPromise = fetch(request);
    const timeoutPromise = new Promise<Response>((_, reject) => {
      timeoutId = setTimeout(() => {
        controller.abort();
        reject(new Error('Request timeout'));
      }, timeout);
    });

    response = await Promise.race([fetchPromise, timeoutPromise]);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    /* response HTTP 에러 시 인터셉터 호출 */
    if (!response.ok) {
      if (responseErrorInterceptor) {
        response = await responseErrorInterceptor(response);
      }
    }

    /* response 성공 시 인터셉터 호출 */
    if (responseSuccessInterceptor) {
      response = await responseSuccessInterceptor(response);
    }

    return {
      data: await response.json(),
      status: response.status,
    };
  };
};

export const basicApiClient = createApiClient();

export const authorizedApiClient = createApiClient({
  requestInterceptor: async (request) => {
    const jwt = localStorage.getItem('bearer');
    if (jwt) {
      const headerObj = Object.fromEntries(request.headers.entries());
      return new Request(request, {
        headers: {
          ...headerObj,
          Authorization: `Bearer ${jwt}`,
        },
      });
    }
    return request;
  },
});
