import express from "express";
import logger from "./logger/index.js";
import handleError from "./middleware/handleError.js";
import { loggerTestRouter } from "./routers/logger-test.router.js";
import { entorno } from "./config/dotenv.config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = entorno.PORT || 9000;

app.use("/logger-test", loggerTestRouter);

app.use(handleError);

const httpServer = app.listen(port, () =>
  logger.info(`escuchando en el puerto ${port}`)
);
