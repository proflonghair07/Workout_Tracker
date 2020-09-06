const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker",
  {
    useNewUrlParser: true,
  }
);

const db = require("./models");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}/`);
});
