export class ApiError extends Error {
  public message: string;
  public status: number;
  public errorCode: string;

  constructor(message: string, status: number, errorCode: string) {
    super(message);
    this.message = message;
    this.status = status;
    this.errorCode = errorCode;
  }
}
