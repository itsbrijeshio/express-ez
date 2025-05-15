import asyncHandler from "./async-handler.js";
import crypto from "crypto";

/**
 * The `randomID` function generates a random hexadecimal ID of a specified length in JavaScript.
 * @param [bytes=16] - The `bytes` parameter in the `randomID` function specifies the number of random
 * bytes to generate for the ID. In this case, the default value is 16 bytes if no value is provided
 * when calling the function.
 */
const randomID = (bytes = 16) => crypto.randomBytes(bytes).toString("hex");

/**
 * The `requestId` function generates a random ID and adds it to the request headers with the key
 * "X-Request-ID".
 */
const requestId = (bytes = 16) =>
  asyncHandler(async (req, res, next) => {
    res.setHeader("X-Request-ID", randomID(bytes));
    next();
  });

export default requestId;
