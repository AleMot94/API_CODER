import TicketDao from "../DAO/mongo-dev/ticket.dao.js";

const ticketDao = new TicketDao();

class TicketService {
  async getAllTickets(limit, page) {
    try {
      const tickets = await ticketDao.get(limit, page);

      let ticketsFlat = tickets.docs.map((ticket) => {
        return {
          id: ticket._id.toString(),
          code: ticket.code,
          purchase_datetime: ticket.purchase_datetime,
          amount: ticket.amount,
          purchase: ticket.purchase,
        };
      });

      const ticketsFlatPaginate = {
        tickets: ticketsFlat,
        totalDocs: tickets.totalDocs,
        limit: tickets.limit,
        totalPages: tickets.totalPages,
        page: tickets.page,
        prevPage: tickets.prevPage,
        nextPage: tickets.nextPage,
        hasPrevPage: tickets.hasPrevPage,
        hasNextPage: tickets.hasNextPage,
      };

      return ticketsFlatPaginate;
    } catch (error) {
      throw error;
    }
  }
}

export const ticketService = new TicketService();
