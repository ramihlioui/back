//deps
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");


dotenv.config()
// app.use(morgan("dev"))
app.use(
  cors({
    origin: [process.env.FRONT_END]
  })
);
app.use(bodyParser({ extended: true }));
app.use(bodyParser.urlencoded());

app.use("/api/api/routers/amin", require("./routers/api"))

module.exports = app