const express = require("express");
const { Client } = require("pg");
require("dotenv/config");
const client = new Client({database: process.env.DB_NAME });
client.connect();
client.query(
  "SELECT $1::text as message",
  ["CONNECTED to DB"],
  (error, response) => {
    console.log(error ? error.stack : response.rows[0].message); // Hello World!
    client.end();
  }
);

const app = express();

app.use(express.json());
const users = require("./routes/users");
app.use("/users", users);

app.listen(4000, () => {
  console.log("server is running http://localhost:4000");
});
