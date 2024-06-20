package com.example.pokerplanninpi.Controller;

import com.example.pokerplanninpi.GlobalService.IEventService;
import com.example.pokerplanninpi.entity.Event;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin
@RequestMapping("/event")
public class EventController {
    @Autowired
    IEventService eventService;

    @GetMapping("/retrieve-all-events")
    public List<Event> getEvents() {
        List<Event> listevents = eventService.retrieveAllEvents();
        return listevents;
    }


    @GetMapping("/retrieve-event/{event-id}")
    public Event retrieveEvent(@PathVariable("event-id") long evId) {
        Event event = eventService.retrieveEvent(evId);
        return event;
    }

    @PostMapping("/addevent")
    public Event addEvent(@RequestBody Event E) {
        return eventService.addEvent(E);
    }

    @PutMapping("/updateevent/{id}")
    public Event update (@PathVariable("id") Long id, @RequestBody Event event){ return  eventService.updateEvent(id, event); }

    @DeleteMapping("/remove-event/{event-id}")
    public ResponseEntity<String> removeEvent(@PathVariable("event-id") long evId) {
        if (eventService.eventExists(evId)) {
            eventService.removeEvent(evId);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all/{date}")
    public List<Event> getEventsByDates(@PathVariable("date") LocalDate date){
        return eventService.retrieveEventByDates(date);
    }



}
