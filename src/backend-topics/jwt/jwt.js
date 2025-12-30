/* ===============================================================================
JWT (JSON Web Token)
npm i jsonwebtoken

1. JWT is a stateless authentication mechanism.
2. After successful login, the server generates a JWT and sends it to the client.
3. The client stores the token (memory / cookie) and sends it with every request.
4. The server verifies the token and allows access to protected resources.

SKELETON OF A JWT:
<header>.<payload>.<signature>

1. Header:
   - JSON object
   - Contains metadata like signing algorithm and token type.

2. Payload:
   - JSON object
   - Contains claims (information about the user or token).

3. Signature:
   - Created using header + payload + secret key.
   - Ensures the token was not tampered with.

-------------------------------------------------------------------------------

PAYLOAD (Claims)

1. The payload stores information about the token and/or the user.
2. Each field in the payload is called a claim.
3. Claims are of two main types:
   1. Registered (predefined) claims
   2. Custom (user-defined) claims

4. Registered claims are mainly used for token validation and security.
5. Custom claims are used to store application-specific user data.

-------------------------------------------------------------------------------

REGISTERED CLAIMS (Examples)

1. exp  → Expiration time (token expiry)
2. nbf  → Not before (token valid after this time)
3. iat  → Issued at (token creation time)
4. sub  → Subject (usually user ID)

-------------------------------------------------------------------------------

CUSTOM CLAIMS (Examples)

1. name
2. role
3. email
4. userId

NOTE:
- Custom claims have no special meaning to JWT libraries.
- They are only interpreted by your application logic.

-------------------------------------------------------------------------------

KEY METHODS

1. jwt.sign(claims, secretKey, options)
   - Creates a JWT
   - options are commonly used to set registered claims like exp, iss, sub

2. jwt.verify(token, secretKey)
   - Verifies the token signature and checks registered claims
   - Returns decoded payload if valid

-------------------------------------------------------------------------------

IMPORTANT NOTES

1. The same secret key used to sign the token must be used to verify it.
2. JWT payload is Base64URL encoded, not encrypted.
3. Sensitive data (passwords, secrets) should NEVER be stored in JWT.

=============================================================================== */

const jwt = require("jsonwebtoken");

let SECRET_KEY = "tigor";

let claims = {
  username: "sivananda reddy",
  userId: 456,
  role: "admin",
};

/* ========================================================================
Creates a JWT
======================================================================== */
const jwtToken = jwt.sign(claims, SECRET_KEY, {
  expiresIn: "10s",
});

/* 
OUTPUT:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 
.eyJ1c2VybmFtZSI6InNpdmFuYW5kYSByZWRkeSIsInVzZXJJZCI6NDU2LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjcwMjIwMzYsImV4cCI6MTc2NzAyMjA0Nn0
.iUy2EjDgqi3xH45OqUza4K4E4uF6ZFawYJY1FYr39IM

*/

/* ========================================================================
Verifies and decodes a JWT token
======================================================================== */
const decodedToken = jwt.verify(jwtToken, SECRET_KEY);
console.log(decodedToken);
/* 
OUTPUT:

{
  username: 'sivananda reddy', // user-defined claim
  userId: 456, // user-defined claim
  role: 'admin', // user-defined claim
  iat: 1767022036, // register claim
  exp: 1767022046 // register claim
}

*/
