// =============== NODE JS BUILT-IN MODULES [HTTP/HTTPS] ===============
// ========== HTTP/HTTPS MODULE ==========

/*======================================================================
The HTTP module allows us to create a webserver in node js

KEY METHODS:
    1. .createServer(callback(req, res)) => this methods creates a server
    2. .listen(PORTnumber, callback(error)) => this method allows us to listen to the server at the specified port number

REQUEST(req) Object:
"req" is an object that contains the data sent by the client to the server
    1. .method => returns the method like "GET", "POST", "DELETE", etc
    2. .url => returns the requested path
    3. .headers => it contains the meta info like "authorization" tokens, "user-agent" type, "content-type", "host" etc

RESPONSE(res) Object:
"res" is the object used by the server to send data back to the client.
    1. .end(msg) => used to end the response and send the data back to the client.
    2. .statusCode => used to send status codes like 404(not found), 200(ok), 500(server error), etc
    3. .setHeader(key, value) => used to send headers to the client.
    4. .writeHead(statusCode, {...headers}) => allows us to wite headers and statusCode in single lin
    5. .write => used to write the data in chunks
    
======================================================================*/

const http = require("http");

const handler = (req, res) => {
  // req object
  console.log("method", req.method);
  console.log("url", req.url);
  console.log("headers (authorization)", req.headers["authorization"]);
  console.log("headers (user-agent)", req.headers["user-agent"]);
  console.log("headers (user-agent)", req.headers.host);

  // res object
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.write("Hello");
  res.write(" World");
  res.end(); // client receives Hello World
};

http.createServer(handler).listen(3000);
