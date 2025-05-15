const message = {
  // Success responses (2xx)
  OK: "Success", // The request has succeeded.
  CREATED: "Success", // The request has been fulfilled and a new resource has been created.
  ACCEPTED: "Success", // The request has been accepted for processing, but the processing is not complete.
  NO_CONTENT: "Success", // The server successfully processed the request, but is not returning any content.
  MOVED_PERMANENTLY: "Success", // The resource has been permanently moved to a new URL.
  FOUND: "Success", // The requested resource has been found at a different URL.
  NOT_MODIFIED: "Success", // The resource has not been modified since the last request.

  // Client error responses (4xx)
  BAD_REQUEST: "Bad Request", // The server could not understand the request due to invalid syntax.
  UNAUTHORIZED: "Unauthorized", // Authentication is required and has failed or has not yet been provided.
  FORBIDDEN: "Forbidden", // The client does not have permission to access the resource.
  NOT_FOUND: "Not Found", // The server could not find the requested resource.
  METHOD_NOT_ALLOWED: "Method Not Allowed", // The method specified in the request is not allowed for the resource.
  NOT_ACCEPTABLE: "Not Acceptable", // The server cannot produce a response that is acceptable to the client.
  CONFLICT: "Conflict", // The request could not be completed due to a conflict with the current state of the resource.
  UNPROCESSABLE_ENTITY: "Unprocessable Entity", // The server understands the content type of the request, but the request was invalid.
  TOO_MANY_REQUESTS: "Too Many Requests", // The client has sent too many requests in a given amount of time.

  // Server error responses (5xx)
  INTERNAL_SERVER_ERROR: "Internal Server Error", // The server encountered an unexpected condition that prevented it from fulfilling the request.
  NOT_IMPLEMENTED: "Not Implemented", // The server does not support the functionality required to fulfill the request.
  BAD_GATEWAY: "Bad Gateway", // The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
  SERVICE_UNAVAILABLE: "Service Unavailable", // The server is currently unavailable (due to overload or maintenance).
  GATEWAY_TIMEOUT: "Gateway Timeout", // The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.
};


export default message;
