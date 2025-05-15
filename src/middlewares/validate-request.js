import { z } from "zod";
import asyncHandler from "./async-handler.js";

/**
 * The function `validateRequest` is a middleware function that validates a request body against a
 * schema using async validation.
 * @param schema - The `schema` parameter in the `validateRequest` function is typically a validation
 * schema or object that defines the structure and constraints for validating the request data. It is
 * used to validate the data in the request body or other specified source (such as query parameters or
 * headers) before processing the request further.
 * @param [source=body] - The `source` parameter in the `validateRequest` function is used to specify
 * where to find the data that needs to be validated. By default, it is set to "body", which means the
 * data will be retrieved from the request body. However, you can also specify other sources such as "
 */
const validateRequest = (schema, source = "body") =>
  asyncHandler(async (req, res, next) => {
    await schema.parseAsync(req[source]);
    next();
  });

// Pre-built schemas
validateRequest.string = (field) =>
  z.string({ coerce: true }).min(1, `${field} is required`);
validateRequest.email = () =>
  z.string({ coerce: true }).email({ message: "Invalid email" });
validateRequest.mongoId = () => z.string({ coerce: true }).uuid();

export default validateRequest;
