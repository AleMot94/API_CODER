import express from "express";
import logger from "./logger/index.js";
import handleError from "./middleware/handleError.js";
import { entorno } from "./config/dotenv.config.js";
import { __dirname } from "./utils/dirname.js";
import connectMongo from "./utils/mongoose.js";
import handlebars from "express-handlebars";

// MANEJO DE SESIONES
/* import session from "express-session";
import MongoStore from "connect-mongo"; */
// ROUTERS
import { productsRouter } from "./routers/products.router.js";
import { cartsRouter } from "./routers/carts.router.js";
import { viewSessionRouter } from "./routers/session.view.router.js";
import { loggerTestRouter } from "./routers/logger-test.router.js";

// CONFIGURACIONES GENERALES
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = entorno.PORT || 9000;
connectMongo();
app.use(express.static(__dirname + "../../public"));
// CONFIGURACION DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "../../views");
app.set("view engine", "handlebars");
//CONFIGURASION PASSPORT
/* initPassport();
app.use(passport.initialize());
app.use(passport.session()); */

/* app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://alejandro1031m:UWj8WnywnULhodYx@ale-cluster0.cywkeum.mongodb.net/?retryWrites=true&w=majority",
      ttl: 86400 * 7,
    }),
    secret: "es-secreto",
    resave: true,
    saveUninitialized: true,
  })
); */

// ENDPOINTS VISTAS
app.use("/", viewSessionRouter);

// ENDPOINTS API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// TEST LOGGER
app.use("/logger-test", loggerTestRouter);

app.use(handleError);

app.listen(port, () => logger.info(`escuchando en el puerto ${port}`));
