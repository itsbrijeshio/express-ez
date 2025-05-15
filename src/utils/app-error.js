/* The class `AppError` extends the `Error` class and allows for creating custom error objects with a
status code, message, and additional error information. */
class AppError extends Error {
  constructor(statusCode, message, ...error) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}

export default AppError;
