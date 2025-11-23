import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketsListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
 
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Public: anyone can open this
  { path: 'ticket/new', component: TicketFormComponent },

  // Login
  { path: 'login', component: LoginComponent },

  // Protected routes
  { path: 'tickets', component: TicketsListComponent, canActivate: [AuthGuard] },
  { path: 'tickets/:id', component: TicketDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
