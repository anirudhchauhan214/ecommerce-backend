const express = require("express");
const app = express();
require("dotenv").config();
require("./db/Connection");

app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.use("/uploads/images", express.static("uploads/images"));

app.use(require("./Routes"));

try {
  app.listen(process.env.DB_PORT, () =>
    console.log("listening on port http://localhost:" + process.env.DB_PORT)
  );
} catch (err) {
  throw err;
}
