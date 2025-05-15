import jwt from "jsonwebtoken";
import asyncHandler from "./async-handler.js";
import { env } from "../config/index.js";
import { httpStatus, message } from "../constants/index.js";
import { AppError } from "../utils/index.js";

/**
 * The `authGuard` function is a middleware that checks for authorization tokens in headers and cookies
 * to authenticate users before allowing access to protected routes.
 * @param [name=token] - The `name` parameter in the `authGuard` function is a default parameter with a
 * default value of "token". This parameter is used to specify the name of the token when retrieving it
 * from the request headers or cookies. If no specific name is provided, it will default to "token".
 */
const authGuard = (name = "token") =>
  asyncHandler(async (req, res, next) => {
    // TODO : add a few better checks for headers authorization
    const authHeaderToken = req.headers?.authorization?.split(" ")[1];
    const secretToken = req.cookies?.[name] || authHeaderToken;
    if (!secretToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, message.UNAUTHORIZED);
    }

    const decoded = await jwt.verify(secretToken, env.get("JWT_SECRET"));
    req.auth = decoded;
    // TODO : check jwt sign id
    if (!req.auth) {
      throw new AppError(httpStatus.UNAUTHORIZED, message.UNAUTHORIZED);
    }

    next();
  });

export default authGuard;
