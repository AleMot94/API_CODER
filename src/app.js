import express from "express";
import logger from "./logger/index.js";
import handleError from "./middleware/handleError.js";
import { entorno } from "./config/dotenv.config.js";
import { __dirname } from "./utils/dirname.js";
import connectMongo from "./utils/mongoose.js";
import handlebars from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initPassport } from "./config/passport.config.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-Ui-Express";

// ROUTERS
import { productsRouter } from "./routers/products.router.js";
import { cartsRouter } from "./routers/carts.router.js";
import { routerSession } from "./routers/session.router.js";
import { routerTicket } from "./routers/ticket.router.js";
import { viewSessionRouter } from "./routers/session.view.router.js";
import { viewProductsRouter } from "./routers/products.view.router.js";
import { loggerTestRouter } from "./routers/logger-test.router.js";

// CONFIGURACIONES GENERALES
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = entorno.PORT || 9000;
connectMongo();
app.use(express.static(__dirname + "../../public"));
// CONFIGURACION DE SESIONES
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: entorno.MONGO_URL,
      ttl: 86400 * 7,
    }),
    secret: "es-secreto",
    resave: true,
    saveUninitialized: true,
  })
);
// CONFIGURASION PASSPORT
initPassport();
app.use(passport.initialize());
app.use(passport.session());
// CONFIGURACION DE HANDLEBARS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "../../views");
app.set("view engine", "handlebars");
// CONFIGURACION DE SWAGGER
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion Pizzas",
      description: "Este proyecto no es de pizzas, es de usuarios",
    },
  },
  apis: [`${__dirname}/../docs/**/*.yaml`],
};
//console.log(`${__dirname}/../docs/**/*.yaml`);
const specs = swaggerJSDoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// ENDPOINTS VISTAS
app.use("/", viewSessionRouter);
app.use("/vista/products", viewProductsRouter);

// ENDPOINTS API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/session", routerSession);
app.use("/api/ticket", routerTicket);

// TEST LOGGER
app.use("/logger-test", loggerTestRouter);

app.use(handleError);

app.listen(port, () => logger.info(`escuchando en el puerto ${port}`));
