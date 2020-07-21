import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import globalErrorHandler from "./controllers/errorController";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server😔`));
});

export default app;
