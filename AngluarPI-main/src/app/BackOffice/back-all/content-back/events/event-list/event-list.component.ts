import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../../services/events/event.service';
import { Event } from '../../../../../model/event'
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit{
  events: Event[] = [];
  filteredEvents: Event[] = [];
  date: string = new Date().toISOString().slice(0, 10);

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.filteredEvents = data;
    });
  }

  filterEventsByDate(): void {
    console.log('Filtering events by date...');
    console.log('Date:', this.date);
    console.log('Events:', this.events);
    this.eventService.getEventsByDate(this.date).subscribe(events => {
      this.filteredEvents = events;
      console.log('Filtered events:', this.filteredEvents);
    });
  }

  updateEvent(id: number): void {
    this.router.navigate(['/admin/update-event', id]);
  }
  deleteEvent(id: number): void {
    if (confirm("Are you sure you want to delete this event?")) {
      this.eventService.deleteEvent(id).subscribe( data => {
        console.log(data);
        this.loadEvents();
      });
    }
  }
  

}
