package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.entity.Event;

import java.time.LocalDate;
import java.util.List;

public interface IEventService {
    public List<Event> retrieveAllEvents();
    public Event retrieveEvent(long idEvent);
    public Event addEvent(Event E);
    public Event updateEvent(Long id, Event event);
    public void removeEvent(long idEvent);
    public boolean eventExists(long eventId);

    public Event changeStatus(long idEvent, String status);
    List<Event> retrieveEventByDates(LocalDate date);
    void updateEventStatus();
}
