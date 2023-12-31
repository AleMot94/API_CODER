import EErros from "../errors/enums.js";
import logger from "../logger/index.js";

export default (error, req, res, next) => {
  logger.error(JSON.stringify(error));
  switch (error.code) {
    // 1
    case EErros.ID_NOT_FOUND:
      res.status(400).send({ statusCode: 400, error: error.name });
      break;
    // 2
    case EErros.FIELD_OBJET_ERROR:
      res.status(400).send({ statusCode: 400, error: error.name });
      break;
    // 3
    case EErros.NOT_CONECT_MONGO:
      res.status(404).send({ statusCode: 404, error: error.name });
      break;
    // 4
    case EErros.COLLECTION_NOT_FOUND:
      res.status(400).send({ statusCode: 400, error: error.name });
      break;
    // 5
    case EErros.FILE_ERROR:
      res.status(400).send({ statusCode: 400, error: error.name });
      break;
    // 6
    case EErros.NOT_ADD_CART:
      res.status(500).send({ statusCode: 500, error: error.name });
      break;
    // 7
    case EErros.EMPTY_CART:
      res.status(400).send({ statusCode: 400, error: error.name });
      break;
    // 8
    case EErros.COULD_NOT_UPDATE:
      res.status(400).send({ statusCode: 400, error: error.name });
      break;
    // 9
    case EErros.PAGE_NOT_FOUND:
      res.status(404).send({ statusCode: 404, error: error.name });
      break;
    default:
      res.status(500).send({ statusCode: 500, error: "Unhandled error" });
      break;
  }
};
