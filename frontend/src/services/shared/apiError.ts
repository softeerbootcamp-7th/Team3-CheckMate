import type { ErrorResponse } from './apiClient';

export class ApiError extends Error implements ErrorResponse {
  public success: false;
  public status: number;
  public errorCode: string;

  constructor(message: string, status: number, errorCode: string) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.success = false;
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};
