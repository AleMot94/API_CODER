import express from "express";
import { productsRouter } from "./routers/products.router.js";
//import { loggerDev } from "./logger/logger.js";
import logger from "./logger/index.js";
import { entorno } from "./config/dotenv.config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = entorno.PORT || 9000;

app.use("/api/products", productsRouter);

const httpServer = app.listen(port, () =>
  logger.info(`escuchando en el puerto ${port}`)
);
