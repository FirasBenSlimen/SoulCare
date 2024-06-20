package com.example.pokerplanninpi.GlobalService;



import com.example.pokerplanninpi.entity.Ticket;

import java.util.List;

public interface ITicketService {
    public List<Ticket> retrieveAllTickets();
    public Ticket retrieveTicket(long idTicket);
    public Ticket addTicket(Ticket A);
    public void removeTicket(long idTicket);
    public Ticket createTicket(long eventId, Ticket ticketDto);
}
