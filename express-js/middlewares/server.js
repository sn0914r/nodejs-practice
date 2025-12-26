/*=================================================================================
MIDDLEWARES IN NODE JS

MIDDLEWARE:
1. It is just a function that runs between request and response in request-response cycle.
2. Visually:-      REQUEST -> Middleware1 -> Middleware2 -> Middleware3 -> RESPONSE

A MIDDLEWARE CAN:
    1. read the request
    2. modify the request/response
    3. stop the request
    4. redirect the request
    5. or pass it to the next middleware

FUNCTION SIGNATURE: (req, res, next)
    1. req = request object
    2. res = response object
    3. next = passes the control to next middleware

3. We can also attach our own properties to the request object and they can be accessed in the next middleware.

TYPES OF MIDDLEWARE:
    1. Application-level Middleware = Runs for all routes.
    2. Route-level Middleware = Runs only for a route.
    3. Built-in middleware = Middleware provided by Express.
    4. Third-party middleware = Middleware provided by third-party libraries.
    5. Error handling middleware = Middleware that handles errors.

=================================================================================*/

const express = require("express");
const cors = require("cors");
const app = express();

/* =============================================================
Application-level Middleware:

1. It runs for all routes
2. The next() fn passes the control for the next middleware

NOTE: if we don't call the next() function in the middlware,
it will not pass the control to the next middleware 
(i.e Route-level middleware in the current program)
============================================================== */
app.use((req, res, next) => {
  console.log("Iam Application-level Middleware");
  next(); // passed control to route-level middleware
});

/* ================================================================
ROUTE-LEVEL MIDDLEWARE

1. It runs only for a specific route (i.e. /users in the current program)
2. The next() fn passes the control for the next middleware
=============================================================== */
app.use("/users", (req, res, next) => {
  console.log("Iam Route-level Middleware");
  next();
});

/* ===============================================================
BUILT-IN MIDDLEWARE:- These are provided by Express

1. express.json() is one of the built-in middlewares that parses the json data from the incoming request.
2. express.urlencoded() is one of the built-in middlewares that parses the urlencoded data from the incoming request.
3. express.static() is one of the built-in middlewares that serves static files from a directory.

4. These funtions (.json(), .static(), & .urlencoded()) returns a middleware function.
5. They can be called at Application-level middleware or Route-level middleware.

NOTE: 
These middleware functions are used to parse the request body.
They are usally called at the top of the middleware stack.
=============================================================== */
app.use(express.json());

/* ===============================================================
THIRD-PARTY MIDDLEWARE:- 
1. These are provided by third-party libraries and must be installed separately using npm.
2. They can be called at Application-level middleware or Route-level middleware.

3. cors, rateLimter, helmet, morgan, etc are some third party middlewares

4. cors is used to allow cross-origin requests. (npm install cors)
5. rateLimter is used to limit the number of requests per minute. (npm install express-rate-limit)
=============================================================== */
app.use(cors()); // installed using npm

/*===============================================================
Ends the request-response cycle and returns the response
=============================================================== */
app.get(
  "/users/user1",

  //   ===== this middleware throws an error and it will be caught by the error handling middleware =====
  (req, res, next) => {
    console.log("I throw an error");
    next(new Error("an error has occured"));
  },

  (req, res) => {
    res.status(200).json({ success: true, data: "user1" });
  }
);

/* ===============================================================
ERROR HANDLING MIDDLEWARE:-

1. It is used to catch errors that occur in routes or other middleware.
2. The signature of an error-handling middleware is (err, req, res, next).
3. Express invokes the error-handling middleware when an error is passed using next(err) or thrown in synchronous code.
4. We can attach custom properties to the error object, and they can be accessed inside the error-handling middleware.
================================================================ */
app.use((err, req, res, next) => {
  console.log("error handling middleware is called");
  // NOTE: we don't call the next() function here, because we don't want to pass the control to the next middleware and its only for identification
  res.status(500).json({ success: false, message: err.message });
});

app.listen(3000, () => {
  console.log("Server is running");
});

/* ===============================================================
TASKS:

LOGGER MIDDLEWARE: To understand the middleware flow
    Log:
        1. HTTP method
        2. URL
        3. Time taken (ms)
    Must call next()

AUTH MIDDLEWARE: To Practice request Blocking
    Rules:
        1. Read header: "Authorization"
        2. If missing -> "401 Unauthorized"
        3. If present -> allow request
    
    Routes:
        1. /public -> no auth
        2. /private -> auth required

BODY VALIDATION MIDDLEWARE: To validate incoming data
    Rules:
        1. For POST/user
        2. Required fields: "name", "email"
        3. If missing -> pass error using "next(err)"

ERROR HANDLING: Central error control
    Requirements:
        1. Catch all errors
        2. Send JSON response: {"success": false, "message": "error message"}

CUSTOM ERROR CLASS: To structure erros.
    Requirement:
        1. Create "AppError"
        2. Properties:
            i. "message"
            ii. "statusCode"
        3. Use it in:
            i. auth middleware
            ii. validation middleware
=============================================================== */
