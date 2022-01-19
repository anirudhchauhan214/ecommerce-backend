const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
require("./db/Connection");
require("./Routes");

try {
  app.listen(process.env.DB_PORT, () =>
    console.log("listening on port http://localhost:" + process.env.DB_PORT)
  );
} catch (err) {
  throw err;
}
