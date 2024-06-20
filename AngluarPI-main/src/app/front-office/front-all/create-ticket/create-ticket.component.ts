import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketService } from '../../../services/events/ticket.service';
import { Ticket } from '../../../model/ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {
   
  id!: number;
  ticket: Ticket = new Ticket();
  @ViewChild('ticketForm') ticketForm: any;

  constructor(private ticketService: TicketService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }

  onSubmit() {
    this.ticketService.addTicketToEvent(this.id, this.ticket).subscribe(data => {
      console.log("Ticket created successfully:", data);
      // Send email using EmailJS
      emailjs.send(
        'service_18e63ef',
        'template_n3nyh9i',
        {
          from_name: "Events Administrator",
          to_name: this.ticket.recipientEmail,
          message: "Please ensure that you bring a copy of this email or your ticket confirmation to the event for smooth entry. If you have any questions or need further assistance, feel free to contact us at tel:28854012.\nWe look forward to seeing you at the event and hope you have a fantastic time!\nBest regards,\nKalech Hamza",
        },
        'kkESgpeNpsNwgxYen'
  ).then(response => {
        console.log('Email sent successfully!');
      })
    .catch(error => {
        console.error('Error sending email:', error);
      });
      
      this.router.navigate(['/tickets']);
    }, error => console.error(error));
  }



}
