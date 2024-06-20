package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.Repository.IEventRepository;
import com.example.pokerplanninpi.Repository.ITicketRepository;
import com.example.pokerplanninpi.entity.Event;
import com.example.pokerplanninpi.entity.Ticket;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class TicketServicelmpl implements ITicketService{
    @Autowired
    ITicketRepository ticketRepository ;
    private final IEventRepository eventRepository;
    @Override
    public List<Ticket> retrieveAllTickets() {
        return ticketRepository.findAll();
    }

    @Override
    public Ticket retrieveTicket(long idTicket) {
        return ticketRepository.findById(idTicket).get();
    }

    @Override
    public Ticket addTicket(Ticket A) {
        return ticketRepository.save(A);
    }

    @Override
    public void removeTicket(long idTicket) {
        ticketRepository.deleteById(idTicket);
    }

    public Ticket createTicket(long eventId, Ticket ticketDto) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        Ticket ticket = new Ticket();
        ticket.setFirstname(ticketDto.getFirstname());
        ticket.setLastname(ticketDto.getLastname());
        ticket.setCin(ticketDto.getCin());
        ticket.setRecipientEmail(ticketDto.getRecipientEmail());
        ticket.setDate(LocalDate.now());
        ticket.setEvent(event);
        event.setNumber_of_tickets(event.getNumber_of_tickets() - 1);

        return ticketRepository.save(ticket);
    }
}
