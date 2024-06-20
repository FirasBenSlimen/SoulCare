package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.Repository.IEventRepository;
import com.example.pokerplanninpi.Repository.ITicketRepository;
import com.example.pokerplanninpi.entity.Event;
import com.example.pokerplanninpi.entity.Statuss;
import com.example.pokerplanninpi.entity.Ticket;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@EnableScheduling
@Service
@AllArgsConstructor
public class EventServicelmpl implements IEventService{
    @Autowired
    IEventRepository eventRepository ;
    ITicketRepository ticketRepository;
    @Override
    public List<Event> retrieveAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event retrieveEvent(long idEvent) {
        return eventRepository.findById(idEvent).get();
    }

    @Override
    public Event addEvent(Event E) {
        return eventRepository.save(E);
    }

    @Override
    public Event updateEvent(Long id, Event event) {
        Event existingEvent = retrieveEvent(id);
        existingEvent.setDescription(event.getDescription());
        existingEvent.setDate(event.getDate());
        existingEvent.setNumber_of_tickets(event.getNumber_of_tickets());
        existingEvent.setAdditional_notes(event.getAdditional_notes());
        existingEvent.setPlace(event.getPlace());
        return eventRepository.save(existingEvent);
    }

    @Override
    public void removeEvent(long idEvent) {
        Event event = eventRepository.findById(idEvent).orElseThrow();
        List<Ticket> tickets = ticketRepository.findByEvent(event);
        tickets.forEach(ticket -> ticketRepository.delete(ticket));
        eventRepository.delete(event);
    }

    @Override
    public boolean eventExists(long eventId) {
        return eventRepository.existsById(eventId);
    }

    @Override
    public Event changeStatus(long idEvent, String newstatus) {
        Event event = eventRepository.findById(idEvent)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        event.setStatuss(Statuss.valueOf(newstatus));
        return eventRepository.save(event);
    }

    @Override
    public List<Event> retrieveEventByDates(LocalDate date) {
        return eventRepository.findByDate(date);
    }



    @Override
    @Scheduled(cron = "*/30 * * * * *") /* Cron expression to run a job every 30 secondes */
    public void updateEventStatus() {
        LocalDate today = LocalDate.now();

        List<Event> events = eventRepository.findAll();
        for (Event event : events) {
            if (event.getDate().isBefore(today) && event.getStatuss() != Statuss.Completed) {
                event.setStatuss(Statuss.Completed);
                eventRepository.save(event);
            }
        }
    }

    }



