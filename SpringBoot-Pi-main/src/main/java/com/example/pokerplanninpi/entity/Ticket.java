package com.example.pokerplanninpi.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private long idTicket;
    private String firstname;
    private String lastname;
    private String cin;
    private String recipientEmail;
    private LocalDate date;

    @ManyToOne(cascade = CascadeType.ALL)
    Event event;


}
