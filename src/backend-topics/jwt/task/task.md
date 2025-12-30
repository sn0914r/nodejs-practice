# JWT AUTHENTICATION TASK – REGISTER FLOW

## OBJECTIVE
Create a JWT-based authentication system starting with a **REGISTER** route.  
You will send data using **Postman** and receive a **JWT token** in response.

---

## STEP 1: PROJECT SETUP

1. Create a project folder:
   ```
   jwt-task
   ```

2. Initialize Node.js:
   ```
   npm init -y
   ```

3. Install dependencies:
   ```
   npm install express jsonwebtoken
   ```

4. Create a single file:
   ```
   server.js
   ```

---

## STEP 2: IN-MEMORY USER STORAGE (NO DATABASE)

Inside `server.js`:
- Create an empty array to store users
- Each user should have:
  - id
  - email
  - password
  - role

This array will act as a fake database.

---

## STEP 3: CREATE REGISTER ROUTE

Route:
```
POST /register
```

---

## STEP 4: SEND DATA FROM POSTMAN

Postman setup:

- Method: POST  
- URL: http://localhost:3000/register  
- Headers:
  ```
  Content-Type: application/json
  ```

Body (raw → JSON):
```json
{
  "email": "student@test.com",
  "password": "123456",
  "role": "STUDENT"
}
```

---

## STEP 5: REGISTER ROUTE LOGIC

Inside `POST /register`:

1. Read `email`, `password`, and `role` from `req.body`
2. Validate required fields
3. Check if user already exists (by email)
4. If user exists, return **400 Bad Request**
5. If not:
   - Create a new user object
   - Assign a unique `userId`
   - Store user in the array

---

## STEP 6: GENERATE JWT TOKEN

After creating the user:

1. Create a JWT using `jwt.sign()`
2. Add custom claims:
   - userId
   - role
3. Set token expiration to **15 minutes**
4. Use a secret key

---

## STEP 7: SEND RESPONSE

Return a response containing:
- Success message
- JWT token

---

## STEP 8: CREATE AUTH MIDDLEWARE

### Purpose
Protect routes using JWT.

### Logic
1. Read token from `Authorization` header  
   Format:
   ```
   Bearer <token>
   ```
2. If token is missing, return **401 Unauthorized**
3. Verify token using `jwt.verify()`
4. Attach decoded payload to `req.user`
5. Call `next()`

---

## STEP 9: CREATE PROTECTED ROUTE

Route:
```
GET /profile
```

### Logic
1. Use auth middleware
2. If token is valid:
   - Return success message
   - Return `req.user` data

---
