import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { TicketDto, TicketServerModel, TicketStatus } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  ticket: TicketDto | null = null;
  loading = true;
  TicketStatus = TicketStatus;
  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.ticketService.getTicketById(id).subscribe({
        next: (t) => {
          this.ticket = t;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          alert('Failed to load ticket.');
        }
      });
    }
  }
 mapToServerModel(ticket: TicketDto): TicketServerModel {
  return {
    status: ticket.status,
    resolution: ticket.resolution
  };
}


  update() {
    if (!this.ticket) return;
    const serverPayload = this.mapToServerModel(this.ticket);
    this.ticketService.updateTicket(this.ticket.id, serverPayload).subscribe({
      next: () => {
        alert('Ticket updated successfully!');
        this.router.navigate(['/tickets']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update ticket.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/tickets']);
  }
}
