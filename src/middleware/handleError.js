import EErros from "../errors/enums.js";

export default (error, req, res, next) => {
  console.log(error.cause);

  switch (error.code) {
    //#1
    case EErros.ID_NOT_FOUND:
      res
        .status(400)
        .send({ statusCode: 400, error: error.name, cause: error.cause });
      break;
    //#2
    case EErros.FIELD_OBJET_ERROR:
      res
        .status(400)
        .send({ statusCode: 400, error: error.name, cause: error.cause });
      break;
    default:
      res.status(500).send({ statusCode: 500, error: "Unhandled error" });
      break;
  }
};
