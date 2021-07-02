const express = require("express");
const http = require("http");
const hostname = "localhost";
const morgan = require("morgan");
const port = "8081";
const bodyParser = require("body-parser");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

app.all("/dishes", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  next();
});

app.get("/dishes", (res, req, next) => {
  res.end("Will send all the dishes to you!");
});

app.post("/dishes", (res, req, next) => {
  res.end(
    "Will add the dish" + req.body.name + "With details:" + req.body.description
  );
});

app.put("/dishes", (res, req, next) => {
  res.statusCode = 403;
  res.end("PUT operations not supported on /dishes");
});

app.delete("/dishes", (req, res, next) => {
  res.end("Deleting all the dishes");
});
app.use(express.static(__dirname + "/public"));

app.get("/dishes/:dishId", (res, req, next) => {
  res.end("Will send details of the dish:" + req.params.dishId + "to you");
});

app.post("/dishes/:dishId", (res, req, next) => {
  res.statusCode = 403;
  res.end("POST operations not supported on /dishes/" + req.params.dishId);
});

app.put("/dishes:/dishId", (res, req, next) => {
  res.write("Updating the dis:" + req.params.dishId + "\n");
  res.end(
    "will update the dish:" +
      req.body.name +
      "with details" +
      req.body.description
  );
});

app.delete("/dishes/dishId", (req, res, next) => {
  res.end("Deleting dish" + req.params.dishId);
});

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  res.end("<html><body><h1>This is a express server</h1></body></html>");
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
