import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../../services/events/event.service';
import { Event } from '../../../../../model/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  event: Event = new Event();

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.eventService.addEvent(this.event)
     .subscribe(
        data => {
          console.log("Event created successfully:", data);
          this.router.navigate(['/admin/events']);
        },
        error => {
          console.log("Error creating event:", error);
        }
      );
  }

}