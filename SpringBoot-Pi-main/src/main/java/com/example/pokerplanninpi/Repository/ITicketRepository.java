package com.example.pokerplanninpi.Repository;

import com.example.pokerplanninpi.entity.Event;
import com.example.pokerplanninpi.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITicketRepository extends JpaRepository<Ticket,Long> {
    List<Ticket> findByEvent(Event event);
}
