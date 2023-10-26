const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");

const logErrors = require("./utils/logErrors");
const errorHandler = require("./utils/errorHandler");

const userRouter = require("./routes/user");
const newsRouter = require("./routes/news");
const newsTagRouter = require("./routes/news_tag");
const tagRouter = require("./routes/tag");
const categoryRouter = require("./routes/category");
const globalNewsRouter = require("./routes/global_news");
const commentsRouter = require("./routes/comments");

const app = express();

app.use(cors());
app.use(bodyParser.json({}));

// application routes
app.use("/users", userRouter);
app.use("/news", newsRouter);
app.use("/news", newsTagRouter);
app.use("/news", commentsRouter);
app.use("/tag", tagRouter);
app.use("/category", categoryRouter);
app.use("/global-news", globalNewsRouter);

// error handlers
app.use(logErrors);
app.use(errorHandler);

module.exports = app;
