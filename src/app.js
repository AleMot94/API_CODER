import express from "express";
import logger from "./logger/index.js";
import handleError from "./middleware/handleError.js";
import { entorno } from "./config/dotenv.config.js";
import connectMongo from "./utils/mongoose.js";
// ROUTERS
import { loggerTestRouter } from "./routers/logger-test.router.js";
import { productsRouter } from "./routers/products.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = entorno.PORT || 9000;
connectMongo();

app.use("/api/products", productsRouter);

// TEST
app.use("/logger-test", loggerTestRouter);

app.use(handleError);

app.listen(port, () => logger.info(`escuchando en el puerto ${port}`));
