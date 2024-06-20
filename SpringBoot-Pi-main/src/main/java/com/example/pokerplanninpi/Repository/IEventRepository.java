package com.example.pokerplanninpi.Repository;

import com.example.pokerplanninpi.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.time.LocalDate;
import java.util.List;

public interface IEventRepository extends JpaRepository<Event,Long> {
    List<Event> findByDate(LocalDate date);

    @Query("select distinct s from Event s where s.date <= CURRENT_TIME order by s.date")
    List<Event> findDistinctOrderByDateAsc();
}
