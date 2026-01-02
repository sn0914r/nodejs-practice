# JWT Tasks

## Task 1: Implement JWT Token Generation

Create a function that generates a JWT token for a user after successful login.

**Requirements:**
- Include custom claims: `userId`, `username`, and `role`
- Set an expiration time of 1 hour
- Use the secret key `'mySecretKey'`
- Export the function as default

**Input:**
```javascript
{
  userId: 123,
  username: "john_doe",
  role: "admin"
}
```

**Expected Output:**
A valid JWT token string

---

## Task 2: Implement JWT Verification Middleware

Create a middleware function that verifies JWT tokens from the Authorization header.

**Requirements:**
- Extract token from the `Authorization` header (format: `Bearer <token>`)
- Verify the token using the secret key `'mySecretKey'`
- If valid, attach the decoded payload to `req.user`
- If invalid or missing, return a 401 Unauthorized response with error message
- Call `next()` if authentication is successful
- Export the middleware as default

**Expected Behavior:**
- Valid token → `req.user` contains decoded payload, `next()` is called
- Invalid token → Response with status 401 and error message
- Missing token → Response with status 401 and error message

---

## Task 3: Implement a Protected Route

Create an Express route that requires JWT authentication.

**Requirements:**
- Use the `verifyToken` middleware from Task 2
- Route path: `/protected`
- HTTP method: GET
- If authenticated, return a JSON response with:
  - `message`: "Access granted"
  - `user`: the username from `req.user`
- Export the router as default

**Expected Response (when authenticated):**
```javascript
{
  message: "Access granted",
  user: "john_doe"
}
```
