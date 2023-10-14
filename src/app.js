import express from "express";
import logger from "./logger/index.js";
import handleError from "./middleware/handleError.js";
import { entorno } from "./config/dotenv.config.js";
import { __dirname } from "./utils/dirname.js";
import connectMongo from "./utils/mongoose.js";
// ROUTERS
import { productsRouter } from "./routers/products.router.js";
import { cartsRouter } from "./routers/carts.router.js";
import { loggerTestRouter } from "./routers/logger-test.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = entorno.PORT || 9000;
connectMongo();
app.use(express.static(__dirname + "../../public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// TEST LOGGER
app.use("/logger-test", loggerTestRouter);

app.use(handleError);

app.listen(port, () => logger.info(`escuchando en el puerto ${port}`));
