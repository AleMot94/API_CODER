import { ticketModel } from "./models/ticket.model.js";
import CustomError from "../../errors/custom-error.js";
import EErros from "../../errors/enums.js";

export default class TicketDao {
  constructor() {}

  get = async (limit, page) => {
    try {
      const tickets = await ticketModel.paginate(
        {},
        { limit: limit || 10, page: page || 1 }
      );
      return tickets;
    } catch (error) {
      throw CustomError.createError({
        name: "error collection",
        message: "product collection not found",
        code: EErros.COLLECTION_NOT_FOUND,
      });
    }
  };

  post = async (newTicket) => {
    try {
      const ticket = await ticketModel.create(newTicket);
      return ticket;
    } catch (error) {
      throw CustomError.createError({
        name: "error objet",
        message: "could not create ticket in database",
        code: EErros.FIELD_OBJET_ERROR,
      });
    }
  };
}
