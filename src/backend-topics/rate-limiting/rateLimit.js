/* ==============================================================================================================================
RATE LIMITING
npm i express-rate-limit

1. Rate limiter is a middleware that controls how many requests a client can make in a given time window and blocks extra requests before the controller or next middleware runs.
2. For example: You can hit this API only 10 times per minute. After that it will be blocked.

WORKFLOW:
Step 1:- Identify client (usally IP address or user ID)
Step 2:- Count requests
Step 3:- Check time window
Step 4:- Block if limit exceeded


NEED OF RATE LIMITING
1. To Prevent brute-force attacks (login/password guessing)
2. To Stop API abuse (spamming requests)
3. To Protect server CPU & memory
4. To Control costs (DB, external APIs)
============================================================================================================================== */

const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // time period i.e., 1 minute
  max: 5, // maxium number of requests
  message: {
    // response when we hit max requests
    success: false,
    message: "Too many requests, try after 1 minute",
  },
});



/* ================================================================================
WORKFLOW:
Client -> limiter -> route handler

In 1 minute:
- If requests ≤ 5 -> limiter does NOTHING -> request reaches controller
- If requests > 5 -> limiter SENDS RESPONSE (429) and STOPS the request
- Controller is NOT executed when limit is exceeded
================================================================================ */
app.get("/rate", limiter, (req, res) => {
  res.status(200).json({
    success: true,
    message: "you hit the AApi",
  });
});

app.listen(PORT, () => {
  console.log("Server is running at port " + PORT);
});
