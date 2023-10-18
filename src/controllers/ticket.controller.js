import { ticketService } from "../services/ticket.services.js";

class TicketController {
  async getAll(req, res) {
    try {
      const { limit, page } = req.query;

      const ticketsPaginate = await ticketService.getAllTickets(limit, page);

      const ticketsArray = ticketsPaginate.tickets;

      return res.status(200).json({
        status: "success",
        payload: ticketsArray,
        totalPages: ticketsPaginate.totalPages,
        prevPage: ticketsPaginate.prevPage,
        nextPage: ticketsPaginate.nextPage,
        page: ticketsPaginate.page,
        hasPrevPage: ticketsPaginate.hasPrevPage,
        hasNextPage: ticketsPaginate.hasNextPage,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        payload: error,
      });
    }
  }
}

export const ticketController = new TicketController();
