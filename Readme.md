# express-ez 🚀  
**Express Middleware Toolkit for Error Handling, Auth, Rate Limiting, and More**  

---

## Features  
✅ **Error Handling** – `asyncHandler` + `AppError`  
✅ **Authentication** – `authGuard` + `signCookie`  
✅ **Rate Limiting** – `createRateLimiter`  
✅ **Validation** – `validateRequest` with Zod  
✅ **Responses** – `sendResponse` with consistent formatting  

---

## Installation  
```bash
npm install express-ez
# or
yarn add express-ez
```

---

## Usage  

### 1. **Error Handling**  
#### `asyncHandler`  
Wrap async routes to auto-catch errors:  
```javascript
const { asyncHandler } = require('express-ez');

app.get('/data', asyncHandler(async (req, res) => {
  const data = await fetchData();
  sendResponse(res, { data });
}));
```

#### `AppError`  
Throw structured errors:  
```javascript
const { AppError } = require('express-ez');

throw new AppError(404, 'User not found', { userId: 123 });
// => { statusCode: 404, message: 'User not found', data: { userId: 123 } }
```

---

### 2. **Authentication**  
#### `authGuard`  
Protect routes with JWT:  
```javascript
const { authGuard } = require('express-ez');

app.get('/profile', authGuard, (req, res) => {
  sendResponse(res, { data: req.auth }); // req.auth = decoded JWT
});
```

#### `signCookie`  
Set secure auth cookies:  
```javascript
const { signCookie } = require('express-ez');

app.post('/login', (req, res) => {
  const token = signCookie(res, { userId: 123 }, { 
    name: 'auth_token', 
    cookieOptions: { sameSite: 'Strict' } 
  });
});
```

---

### 3. **Rate Limiting**  
#### `createRateLimiter`  
Customize rate limits per route:  
```javascript
const { createRateLimiter } = require('express-ez');

const strictLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10, // 10 requests per window
  message: 'Too many attempts. Try again later.'
});

app.post('/login', strictLimiter, authController);
```

---

### 4. **Validation**  
#### `validateRequest`  
Validate requests with Zod:  
```javascript
const { z } = require('zod');
const { validateRequest } = require('express-ez');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

app.post('/login', validateRequest(loginSchema), (req, res) => {
  // req.body is now validated!
});
```

---

### 5. **Responses**  
#### `sendResponse`  
Consistent JSON responses:  
```javascript
const { sendResponse } = require('express-ez');

app.get('/success', (req, res) => {
  sendResponse(res, { 
    statusCode: 200, 
    data: { key: 'value' },
    message: 'Custom success message' 
  });
});

// Output:
// { success: true, status: 200, message: "...", data: { ... } }
```

---

### 6. **Authorization**  
#### `authorize`  
Role-based access control:  
```javascript
const { authorize } = require('express-ez');

const adminOnly = authorize(['admin']);
app.delete('/users/:id', authGuard, adminOnly, (req, res) => {
  // Only admins can reach here
});
```

---

### 7. **Messages & Constants**  
Pre-defined HTTP messages:  
```javascript
const { httpStatus, messages } = require('express-ez');

console.log(httpStatus.NOT_FOUND); // 404
console.log(messages.UNAUTHORIZED); // "You are not logged in"
```

---

### 8. **Request ID Middleware**
Automatically adds a unique `X-Request-ID` header to each request for tracing:

```javascript
const { requestId } = require('express-ez');

// Basic usage (default 16-byte ID)
app.use(requestId());

// Custom ID length (e.g., 8 bytes)
app.use(requestId(8));
```

**Behavior**:
- Generates a cryptographically random hex ID (e.g., `X-Request-ID: a1b2c3d4e5f6`)
- Works with `asyncHandler` for error propagation
- Compatible with tracing systems (Datadog, OpenTelemetry)

**Example Output**:
```http
HTTP/1.1 200 OK
X-Request-ID: 7b3f8e2a9d0c4f61
```

---

## Advanced Configuration  

### Customizing Defaults  
```javascript
const { env } = require('express-ez');

// Override JWT settings at startup
env.defaults.JWT_SECRET = 'my_new_secret';
env.defaults.MAX_AGE = 48;
```

---

## Examples  
### Full Auth Flow  
```javascript
const { 
  asyncHandler, 
  authGuard, 
  signCookie, 
  validateRequest 
} = require('express-ez');

app.post(
  '/login',
  validateRequest(loginSchema),
  asyncHandler(async (req, res) => {
    const user = await loginUser(req.body);
    signCookie(res, { userId: user.id });
    sendResponse(res, { data: user });
  })
);

app.get('/profile', authGuard, (req, res) => {
  sendResponse(res, { data: req.auth });
});
```

---

## Why Choose `express-ez`?  
- **Zero Boilerplate**: Sane defaults for quick setup.  
- **Flexible**: Customize everything (cookies, rate limits, errors).  

---

## Contributing  
PRs welcome! See [GitHub](https://github.com/itsbrijeshio/express-ez).  

--- 

## License  
MIT © [Brijesh GP](https://github.com/itsbrijeshio)  

--- 