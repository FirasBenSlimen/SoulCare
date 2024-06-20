import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../../services/events/event.service';
import { Event } from '../../../../../model/event';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit{
   
  id!: number;
  event: Event = new Event();

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.eventService.getEventById(this.id).subscribe(data => {
      this.event = data;
    }, error => console.error(error));
  }

  onSubmit() {
    this.eventService.updateEvent(this.id, this.event).subscribe(data => {
      console.log("Event updated successfully:", data);
      this.goToEventList();
    }, error => console.error(error));
  }
  goToEventList(): void {
    this.router.navigate(['/admin/events']);
  }

  

  
  

}
