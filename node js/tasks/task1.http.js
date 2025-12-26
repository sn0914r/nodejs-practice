/*======================================================================
TASK: Create a Simple Notes API using only Node.js "http" module that stores 
the data in an array

GET /notes => Gets all notes
PUT /notes => Adds a new note
======================================================================*/

const http = require("http");

const notes = [];

const listener = (req, res) => {
  if (req.url === "/notes") {
    if (req.method === "GET") {
      let response = JSON.stringify({
        success: "true",
        message: "data received successfully",
        data: notes,
      });

      res.statusCode = 200;
      res.end(response);
    }

    if (req.method === "PUT") {
      let body = "";

      req.on("data", function (chuck) {
        body += chuck;
      });

      req.on("error", function (error) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            success: false,
            message: error.message || "failed to add notes",
          })
        );
      });

      req.on("end", function () {
        try {
          let data = JSON.parse(body);

          const note = {
            id: notes.length + 1,
            text: data.text,
          };

          notes.push(note);

          res.statusCode = 201;

          res.end(
            JSON.stringify({
              success: true,
              message: "note successfully added",
              data: note,
            })
          );
        } catch (error) {
          res.statusCode = 201;
          res.end(
            JSON.stringify({
              success: false,
              message: error.message || "failed to add notes",
            })
          );
        }
      });
    }
  } else {
    res.statusCode = 404;
    res.end("route not found");
  }
};

http.createServer(listener).listen(3000, () => console.log("server started"));
