/* eslint-disable node/no-unsupported-features/es-syntax */
class AppError {
  constructor(statusCode, msg) {
    this.statusCode = statusCode;
    this.message = msg;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
  }
}

export default AppError;
