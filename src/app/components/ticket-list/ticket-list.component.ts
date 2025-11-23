import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { TicketDto, TicketStatus } from '../../models/ticket.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketsListComponent implements OnInit {
  tickets: TicketDto[] = [];
  filteredTickets: TicketDto[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'actions'];
  statusFilter: TicketStatus | '' = '';
  searchText: string = '';
 TicketStatus = TicketStatus;
  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getAllTickets().subscribe((res) => {
      this.tickets = res;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredTickets = this.tickets.filter((t) => {
      const matchesStatus = this.statusFilter ? t.status === this.statusFilter : true;
      const matchesSearch = t.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
                            t.description.toLowerCase().includes(this.searchText.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  openTicket(id: string) {
    this.router.navigate(['/tickets', id]);
  }

  openNewTicket() {
    this.router.navigate(['/tickets/new']);
  }
}
