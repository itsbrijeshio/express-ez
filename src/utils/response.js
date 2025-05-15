/**
 * The function `sendResponse` sends a JSON response with a specified status code, message, and
 * additional data.
 * @param res - The `res` parameter in the `sendResponse` function is the response object that is used
 * to send a response back to the client in an Express.js application.
 * @returns The `sendResponse` function is returning a JSON response with the following structure:
 * ```
 * {
 *   status: statusCode,
 *   success: true,
 *   message,
 *   ...data
 * }
 * ```
 * The `status` field will have the value of the `statusCode` parameter (default is 200), the `success`
 * field will always be `true`, the `message` field will have the value
 */
const sendResponse = (
  res,
  { statusCode = 200, message = "Success", ...data }
) => {
  return res.status(statusCode).json({
    status: statusCode,
    success: true,
    message,
    ...data,
  });
};

export default sendResponse;
