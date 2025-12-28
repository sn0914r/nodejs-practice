EXPRESS MIDDLEWARE PRACTICE TASKS

===============================

TASK SET 1: CORE MIDDLEWARE

Task 1: Logger Middleware
Goal:
Understand middleware flow.

Requirements:
- Log HTTP method
- Log request URL
- Log time taken (in ms)
- Must call next()

Expected Output:
GET /users - 12ms
POST /login - 4ms

--------------------------------

Task 2: Auth Middleware
Goal:
Practice request blocking.

Rules:
- Read header: Authorization
- If missing → return 401 Unauthorized
- If present → allow request

Routes:
- /public → no auth required
- /private → auth required

--------------------------------

Task 3: Body Validation Middleware
Goal:
Validate incoming request data.

Rules:
- Route: POST /user
- Required fields: name, email
- If missing → create error and pass using next(err)

================================

TASK SET 2: ERROR HANDLING

Task 4: Global Error Handling Middleware
Goal:
Centralized error handling.

Requirements:
- Catch all errors
- Send JSON response:
{
  success: false,
  message: "error message"
}

--------------------------------

Task 5: Custom Error Class
Goal:
Structured error handling.

Requirements:
- Create AppError class
- Properties:
  - message
  - statusCode
- Use this error in:
  - auth middleware
  - validation middleware

--------------------------------

Task 6: Async Handler Wrapper
Goal:
Handle async errors cleanly.

Requirements:
- Create asyncHandler(fn)
- Use it in:
  - GET /users (simulate async failure using Promise.reject())

================================

TASK SET 3: REAL-WORLD MIDDLEWARE

Task 7: Custom Rate Limiter Middleware
Goal:
Think like a backend engineer.

Rules:
- Limit: 5 requests per minute per IP
- If exceeded → return 429 Too Many Requests
- Use in-memory storage (object)

--------------------------------

Task 8: Role-Based Access Middleware
Goal:
Advanced authorization logic.

Rules:
- Read header: x-role
- Roles:
  - admin → full access
  - user → read-only access
- Protect route: /admin

================================

TASK SET 4: MIDDLEWARE ORDER (DEBUGGING)

Task 9: Middleware Order Bug
Goal:
Debug middleware execution order.

Scenario:
- Logger middleware is not running
- req.body is undefined

Your Task:
- Fix middleware order
- Explain why the issue occurred

================================

FINAL BOSS TASK (OPTIONAL)

Task 10: Mini API with Middleware

Routes:
- POST /login
- GET /profile
- POST /posts

Must use:
- Logger middleware
- Auth middleware
- Async handler
- Custom AppError
- Global error handling middleware

================================

HOW TO PRACTICE:
- Do tasks one by one
- Do not jump between tasks
- Write mistakes and fix them
- Focus on understanding middleware flow

END OF FILE

