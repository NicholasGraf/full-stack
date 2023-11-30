const http = require("http");
const url = require("url");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "full-stack",
  password: "password",
  port: 5432,
});

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const { pathname, query } = url.parse(req.url, true);

  if (req.method === "GET" && pathname === "/items") {
    handleGetItems(req, res);
  } else if (req.method === "POST" && pathname === "/items") {
    handlePostItem(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

function handleGetItems(req, res) {
  pool.query("SELECT * FROM items", (error, result) => {
    if (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result.rows));
    }
  });
}

function handlePostItem(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch (error) {
      console.error(error);
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Invalid JSON format");
      return;
    }

    const { firstName, lastName, age, address, city, zip } = parsedBody;

    pool.query(
      "INSERT INTO items (firstName, lastName, age, address, city, zip, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *",
      [firstName, lastName, age, address, city, zip],
      (error, result) => {
        if (error) {
          console.error(error);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Internal Server Error");
        } else {
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result.rows[0]));
        }
      }
    );
  });
}

const port = 8000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
