/*=================================================================================
ROUTING & RESPONSE HANDLING

ROUTING:
Routing means deciding what code runs for a specific URL + HTTP method.

Handling the request
    app.METHOD(PATH, HANDLER)
    
REQUEST (req) METHODS:
    ROUTE & URL DATA:
        1. req.params.PARAMETER => conatins the value of PARAMETER
        2. req.query.QUERY => conatins the value of QUERY
        3. req.url => conatins the url
        4. req.method => conatins the method type

    BODY/PAYLOAD DATA
        5. req.body => contains the data sent by client (POST/PUT)
    
    HEADERS & Metadata
        6. req.headers => contains the meta data like content-type, content-length, authorization token, etc
        7. req.hostname => contains the host name
        8. req.protocol => contains the protocol

RESPONSE(res) Object Methods:
    SENDING DATA
        1. res.send()
        2. res.json()
        3. res.end()
        4. res.sendFile()
        5. res.redirect()
    
    STATUS
        1. res.status(statusCode) => sets status only
        2. res.sendStatus(statusCode) => sets the status and sends the response
    
    HEADERS CONFIGURATION
        1. res.set() => sets headers
        2. res.type("type") => sets "Content-Type"
        3. res.header() => old way to set headers

    => Express supports method chaining because most methods return `res`.
    => All response configuration must happen before sending the response.
=================================================================================*/

const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/get/:id", (req, res) => {
  // REQUEST OBJECT
  console.table(req.headers);
  console.log(req.hostname); // localhost
  console.log(req.protocol); // http

  console.log(req.method); // GET
  console.log(req.url); // /get/12345?name=%22Siva%22
  console.log(req.params.id); // 12345
  console.log(req.query.name); // Siva

  // RESPONSE OBJECT
  res.status(200);
  res.type("json");
  res.set("author", "Sivananda Reddy");
  res.json({
    success: true,
  });
  /*------------------------------
  or we can chain the methods like:
  res.status(200).type("json").set("author", "Sivananda Reddy").json({success: true})
  ------------------------------*/
});

app.listen(PORT, (error) => {
  if (error) {
    console.log(error.message || "Failed to start the server");
    return;
  }
  console.log("Server started at", PORT);
});
