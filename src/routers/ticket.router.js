import express from "express";
import { ticketController } from "../controllers/ticket.controller.js";

export const routerTicket = express.Router();

routerTicket.get("/", ticketController.getAll);
