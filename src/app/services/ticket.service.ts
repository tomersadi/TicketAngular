import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TicketDto } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:5001/Ticket';

  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<TicketDto[]> {
    return this.http.get<TicketDto[]>(this.apiUrl);
  }

  getTicketById(id: string): Observable<TicketDto> {
    return this.http.get<TicketDto>(`${this.apiUrl}/${id}`);
  }

  createTicket(ticket: any): Observable<TicketDto> {
    return this.http.post<TicketDto>(this.apiUrl, ticket);
  }

  updateTicket(id: string, ticket: any): Observable<TicketDto> {
    return this.http.put<TicketDto>(`${this.apiUrl}/${id}`, ticket);
  }
}
