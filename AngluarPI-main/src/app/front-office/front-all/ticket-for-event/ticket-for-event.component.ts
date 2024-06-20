import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../services/events/event.service';
import { Event, Statuss } from '../../../model/event'
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-for-event',
  templateUrl: './ticket-for-event.component.html',
  styleUrls: ['./ticket-for-event.component.css']
})
export class TicketForEventComponent {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  date: string = new Date().toISOString().slice(0, 10);
 

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.loadEvents();
   // this.filteredEvents.forEach(event => {
     // console.log(event.status); // add this line to check the status value
    //});
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.filteredEvents = data;
    });
  }
  isEventCompleted(event: { statuss: Statuss }): boolean {
    const result = event.statuss.toString() === Statuss.Completed.toString() || event.statuss.toString() === Statuss.Canceled.toString();
    console.log('Event status:', event.statuss, 'Result:', result);
    return result;
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
  getTcket(id: number): void {
    this.router.navigate(['create-ticket', id]);
  }


}
