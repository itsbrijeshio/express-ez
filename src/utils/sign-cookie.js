import jwt from "jsonwebtoken";
import { env } from "../config/index.js";

/**
 * The function `signCookie` signs a JWT token with the provided payload and options, then sets it as a
 * cookie in the response.
 * @param res - The `res` parameter in the `signCookie` function is typically the response object in a
 * Node.js application. It is used to send the HTTP response back to the client, including setting
 * cookies in this case.
 * @param payload - The `payload` parameter in the `signCookie` function typically represents the data
 * that you want to encode into a JSON Web Token (JWT). This data can include information such as user
 * details, permissions, or any other relevant information that needs to be securely transmitted and
 * verified.
 * @param [options] - The `options` parameter in the `signCookie` function is an object that can
 * contain the following properties:
 * @returns The function `signCookie` returns the generated JWT token after signing the payload and
 * setting it as a cookie in the response object.
 */
const signCookie = async (res, payload, options = {}) => {
  const {
    name = "token", // Customizable name
    secret = env.get("JWT_SECRET"), // Fallback to env
    expiresIn = env.get("JWT_EXPIRATION"),
    cookieOptions = {}, // Full override
  } = options;

  const token = await jwt.sign(payload, secret, { expiresIn });

  const defaultCookieOptions = {
    httpOnly: true,
    secure: env.get("NODE_ENV") === "production",
    sameSite: "Lax",
    maxAge: env.get("MAX_AGE") * 3600 * 1000,
    ...cookieOptions,
  };

  res.cookie(name, token, defaultCookieOptions);
  return token;
};

export default signCookie;
