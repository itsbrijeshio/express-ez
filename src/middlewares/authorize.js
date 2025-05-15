import asyncHandler from "./async-handler.js";
import { AppError } from "../utils/index.js";
import { httpStatus, message } from "../constants/index.js";

/**
 * The `authorize` function checks if the authenticated user has the required role to access a route
 * and throws a forbidden error if not.
 * @param [roles] - The `roles` parameter in the `authorize` function is an array that contains the
 * roles that are allowed to access a particular route or resource. It is an optional parameter with a
 * default value of an empty array `[]`.
 * @param [name=role] - The `name` parameter in the `authorize` function is used to specify the
 * property name in the `req.auth` object that contains the role information to be checked against the
 * roles specified in the `roles` array. By default, if no `name` is provided, it will use "role
 */
const authorize = (roles = [], name = "role") =>
  asyncHandler(async (req, res, next) => {
    if (!roles?.includes(req.auth?.[name])) {
      throw new AppError(httpStatus.FORBIDDEN, message.FORBIDDEN);
    }

    next();
  });

export default authorize;
