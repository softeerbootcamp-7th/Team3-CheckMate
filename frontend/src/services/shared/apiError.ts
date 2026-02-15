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

export const createApiError = async (response: Response): Promise<ApiError> => {
  let errorData: ErrorResponse;
  try {
    errorData = (await response.json()) as ErrorResponse;
  } catch {
    errorData = {
      success: false,
      message: 'Unknown error',
      errorCode: 'UNKNOWN_ERROR',
    };
  }
  return new ApiError(errorData.message, response.status, errorData.errorCode);
};
