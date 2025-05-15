import { rateLimit } from "express-rate-limit";

/* `const defaultWindowM = 15 * 60 * 1000;` is calculating the default window time in milliseconds for
rate limiting. */
const defaultWindowM = 15 * 60 * 1000;

/* The `const defaultOptions` object is defining the default configuration options for rate limiting
using the `express-rate-limit` middleware in a Node.js application. */
const defaultOptions = {
  windowMs: defaultWindowM, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
};

/**
 * The function createRateLimiter returns a rate limiter with customizable options for handling rate
 * limiting of requests.
 * @param [options] - The `options` parameter in the `createRateLimiter` function is an object that can
 * contain the following properties:
 * @returns The `createRateLimiter` function returns a rate limiter middleware function with the
 * specified options. The function uses the `rateLimit` middleware and merges the default options with
 * the provided options, including customizing the error message for when there are too many requests.
 */
const createRateLimiter = (options = {}) => {
  return rateLimit({
    ...defaultOptions,
    message: {
      error: `Too many requests, please try again after ${
        (options?.windowMs || defaultWindowM) / (1000 * 60)
      } minutes.`,
      status: 429,
    },
    ...options,
  });
};

export default createRateLimiter;
