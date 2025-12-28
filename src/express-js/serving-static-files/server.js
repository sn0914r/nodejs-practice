/*=========================================================================================
SERVING STATIC FILES

1. Serving Static Files means sending HTML, CSS, and JS files diretly to the browser.
2. In express we can easily server static files using express.static() middleware.
3. It takes the directory path as an argument and returns a middleware funtion.
4. This middleware sends the static files from the specified ddirectory to the client(Browser).

====================================================
SYNTAX:-
app.use(express.static(ABSOLUTE_PATH_TO_DIRECTORY));
====================================================
=========================================================================================*/

const express = require("express");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

/*========================================
Serves the static files form the public directory

serves index.html for GET /
serves script.js for GET /script.js
serves styles.css for GET /styles.css
========================================== */
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log("Server is running at", PORT);
});
