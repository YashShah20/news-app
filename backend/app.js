const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");

const logErrors = require("./utils/logErrors");
const errorHandler = require("./utils/errorHandler");

const userRouter = require("./routes/user");
const newsRouter = require("./routes/news");
const tagRouter = require("./routes/tag");

const app = express();

app.use(cors());
app.use(bodyParser.json({}));

// application routes
app.use("/users", userRouter);
app.use("/news", newsRouter);
app.use("/tag", tagRouter);

// error handlers
app.use(logErrors);
app.use(errorHandler);

module.exports = app;
