import { postAuthRefresh } from '../auth';

import { ApiError } from './apiError';

class AuthToken {
  private accessToken: string;
  private isRefreshing: boolean = false;
  private retryQueue: {
    request: Request;
    response: Response;
    resolve: (value: Response | PromiseLike<Response>) => void;
    reject: () => void;
  }[] = [];

  constructor() {
    this.accessToken = '';
    this.isRefreshing = false;
    this.retryQueue = [];
  }

  get() {
    return this.accessToken;
  }

  set(token: string) {
    this.accessToken = token;
  }

  async insert(request: Request) {
    if (this.accessToken) {
      const headers = new Headers(request.headers);
      headers.set('Authorization', `Bearer ${this.accessToken}`);
      return new Request(request, {
        headers,
      });
    }
    return request;
  }

  async reissue(request: Request, response: Response) {
    // 만약 response status 가 401 이면 access token 을 갱신하고 재요청
    if (response.status === 401) {
      // access token을 갱신하지 않고 있다면
      if (!this.isRefreshing) {
        // access token 갱신 여부 플래그 설정
        this.isRefreshing = true;
        try {
          // access token 갱신 요청
          const { accessToken } = await postAuthRefresh();
          this.set(accessToken);

          // access token 갱신 후 재요청 큐에 있는 요청들 재요청
          this.retryQueue.forEach(async ({ request, resolve, reject }) => {
            const retryRequest = await this.insert(request.clone());
            fetch(retryRequest)
              .then((res) => resolve(res))
              .catch(reject);
          });

          // 첫 요청 재요청
          const retryRequest = await this.insert(request.clone());
          return fetch(retryRequest);
        } catch {
          // 재요청 큐에 있는 요청들 실패 처리
          this.retryQueue.forEach(({ reject }) => {
            reject();
          });
          // 재요청 큐 초기화
          // 로그인 페이지로 리다이렉트
          throw new ApiError('Unauthorized', 401, 'UNAUTHORIZED');
        } finally {
          // access token 갱신 여부 플래그 초기화
          this.isRefreshing = false;
          // 재요청 큐 초기화
          this.retryQueue.length = 0;
        }
      }
      // 재요청 큐에 요청 추가
      return new Promise<Response>((resolve, reject) => {
        this.retryQueue.push({
          request: request.clone(),
          response,
          resolve,
          reject,
        });
      });
    }
    // 401 이 아니면 그냥 응답 반환
    return response;
  }

  remove() {
    this.accessToken = '';
  }
}

export const authToken = new AuthToken();
