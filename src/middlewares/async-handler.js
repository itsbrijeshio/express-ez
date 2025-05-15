import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/index.js";
import { httpStatus, message } from "../constants/index.js";

/**
 * The `formatZodError` function formats a Zod validation error object into a more readable structure.
 * @param zodError - ZodError is an error object that is thrown when validating data using the Zod
 * library in JavaScript. It contains information about the validation issues that occurred during the
 * validation process. The `issues` property of the ZodError object is an array of individual
 * validation issues, each describing a specific problem encountered
 * @returns The `formatZodError` function is returning an object that contains information about the
 * issues found in a Zod error. The object has keys representing the paths to the issues and values
 * that are objects containing the code, message, expected type (if available), and received type (if
 * available) for each issue.
 */
const formatZodError = (zodError) => {
  return zodError.issues.reduce((acc, issue) => {
    const path = issue.path.join(".");
    acc[path] = {
      code: issue.code, // e.g., 'invalid_type'
      message: issue.message, // e.g., 'Expected string, got number'
      expected: issue.expected, // (Optional) Expected type
      received: issue.received, // (Optional) Received type
    };
    return acc;
  }, {});
};

/**
 * The defaultErrorFormatter function handles different types of errors and returns appropriate error
 * responses.
 * @param error - The `defaultErrorFormatter` function takes an `error` parameter and checks its type
 * to determine how to format and return an error object. Depending on the type of error, it returns an
 * object with specific properties such as `status`, `message`, and additional error details.
 * @returns The `defaultErrorFormatter` function returns an object with `status`, `message`, and
 * potentially other properties based on the type of error passed to it. If the error is an instance of
 * `ZodError`, it returns an object with status code `httpStatus.BAD_REQUEST`, message
 * `message.VALIDATION_ERROR`, and the formatted Zod error. If the error is an instance of `App
 */
const defaultErrorFormatter = (error) => {
  if (error instanceof ZodError) {
    return {
      status: httpStatus.BAD_REQUEST,
      message: message.VALIDATION_ERROR,
      error: formatZodError(error),
    };
  } else if (error instanceof AppError) {
    return {
      status: error.statusCode,
      message: error.message,
      ...error.error,
    };
  } else if (
    error instanceof jwt.JsonWebTokenError ||
    error instanceof jwt.NotBeforeError ||
    error instanceof jwt.TokenExpiredError
  ) {
    return {
      status: httpStatus.UNAUTHORIZED,
      message: message.UNAUTHORIZED,
    };
  }

  return {
    status: 500,
    message: "Something went wrong",
  };
};

/**
 * The asyncHandler function is a higher-order function in JavaScript that wraps an asynchronous
 * handler function and provides error handling functionality.
 * @param handler - The `handler` parameter is a function that represents the asynchronous function
 * that will be executed when the middleware is called. It typically takes in the request, response,
 * and next function as parameters to handle the request processing logic.
 * @param [errorFormatter] - The `errorFormatter` parameter in the `asyncHandler` function is a
 * function that is used to format errors before sending a response. It allows you to customize how
 * errors are handled and formatted in your application. If no `errorFormatter` function is provided
 * when calling `asyncHandler`, it will default
 */
const asyncHandler =
  (handler, errorFormatter = defaultErrorFormatter) =>
  async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      const formatted = errorFormatter(error);
      if (formatted.status === 500) console.error(error);

      res.status(formatted?.status).json(formatted);
    }
  };

export default asyncHandler;
