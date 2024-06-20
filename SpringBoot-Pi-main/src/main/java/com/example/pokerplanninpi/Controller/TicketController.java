package com.example.pokerplanninpi.Controller;

import com.example.pokerplanninpi.GlobalService.ITicketService;
import com.example.pokerplanninpi.entity.Ticket;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/ticket")
public class TicketController {
    @Autowired
    ITicketService ticketService;

    @GetMapping("/retrieve-all-tickets")
    public List<Ticket> getTickets() {
        List<Ticket> listtickets = ticketService.retrieveAllTickets();
        return listtickets;
    }


    @GetMapping("/retrieve-ticket/{ticket-id}")
    public Ticket retrieveTicket(@PathVariable("ticket-id") Long tId) {
        Ticket ticket = ticketService.retrieveTicket(tId);
        return ticket;
    }

    @PostMapping("/addticket")
    public Ticket addTicket(@RequestBody Ticket t) {
        return ticketService.addTicket(t);
    }

    @DeleteMapping("/remove-ticket/{ticket-id}")
    public void removeTicket(@PathVariable("ticket-id") long tId) {
        ticketService.removeTicket(tId);
    }

    @PostMapping("/add/{eventId}")
    public ResponseEntity<Ticket> addTicketToEvent(@PathVariable("eventId") long eventId,
                                                   @RequestBody Ticket ticketDto) {
        Ticket ticket = ticketService.createTicket(eventId, ticketDto);
        return ResponseEntity.ok(ticket);
    }
}
