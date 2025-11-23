import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { TicketDto } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent {
  ticket: Partial<TicketDto> = {
    fullName: '',
    email: '',
    description: ''
  };

  constructor(private ticketService: TicketService, private router: Router) {}

  submit() {
    this.ticketService.createTicket(this.ticket).subscribe({
      next: () => {
        alert('Ticket created successfully!');
        this.router.navigate(['/tickets']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to create ticket.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/tickets']);
  }
}
