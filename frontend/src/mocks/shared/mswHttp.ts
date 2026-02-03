import {
  type DefaultBodyType,
  http,
  type HttpHandler,
  type HttpResponseResolver,
  type PathParams,
} from 'msw';

import { API_BASE_URL } from '@/constants/shared';
import type { ApiResponse } from '@/services/shared';

export const mswHttp = {
  get: <T, RequestBodyType extends DefaultBodyType = DefaultBodyType>(
    url: string,
    resolver: HttpResponseResolver<PathParams, RequestBodyType, ApiResponse<T>>,
  ): HttpHandler => http.get(`${API_BASE_URL}${url}`, resolver),
  post: <T, RequestBodyType extends DefaultBodyType = DefaultBodyType>(
    url: string,
    resolver: HttpResponseResolver<PathParams, RequestBodyType, ApiResponse<T>>,
  ): HttpHandler => http.post(`${API_BASE_URL}${url}`, resolver),
  put: <T, RequestBodyType extends DefaultBodyType = DefaultBodyType>(
    url: string,
    resolver: HttpResponseResolver<PathParams, RequestBodyType, ApiResponse<T>>,
  ): HttpHandler => http.put(`${API_BASE_URL}${url}`, resolver),
  patch: <T, RequestBodyType extends DefaultBodyType = DefaultBodyType>(
    url: string,
    resolver: HttpResponseResolver<PathParams, RequestBodyType, ApiResponse<T>>,
  ): HttpHandler => http.patch(`${API_BASE_URL}${url}`, resolver),
  delete: <T, RequestBodyType extends DefaultBodyType = DefaultBodyType>(
    url: string,
    resolver: HttpResponseResolver<PathParams, RequestBodyType, ApiResponse<T>>,
  ): HttpHandler => http.delete(`${API_BASE_URL}${url}`, resolver),
};
