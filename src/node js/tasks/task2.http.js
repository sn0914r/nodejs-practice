/*===========================================================================
Create a file named page.html with any content.
Then create a route "/page" that reads the file using fs.readFile() and sends it in the response.
===========================================================================*/

const http = require("http");
const fs = require("fs");

const listener = (req, res) => {
  const { method, url } = req;
  if (method === "GET" && url === "/page") {
    fs.readFile("tasks/page.html", (err, data) => {
      if (err) {
        res.writeHead(505, { "Content-Type": "text/plain" });
        res.end(err.message || "failed to display content");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    res.end("go to '/page' route");
  }
};

const server = http.createServer(listener);
server.listen(3000, (error) => {
  if (error) return console.log(error.message);
  console.log("Server is running");
});
