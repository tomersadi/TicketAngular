export interface TicketDto {
  id: string;
  fullName: string;
  email: string;
  description: string;
  status: TicketStatus;
  resolution?: string;
  aiSummary?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum TicketStatus {
  Open = 0,
  InProgress = 1,
  Resolved = 2,
  Closed = 3
}

export interface TicketServerModel {
  status: TicketStatus;      
  resolution?: string; 
}

