type ErrorCode = 500 | 401 | 403 | 400 | 404;

export default class ErrorStatus extends Error {
  status;
  constructor(message: string, status: ErrorCode) {
    super(message);
    this.status = status;
  }
}
