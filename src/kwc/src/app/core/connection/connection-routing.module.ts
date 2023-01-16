import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionComponent } from './components/connection/connection.component';

import { NewConnectionComponent } from './components/new-connection/new-connection.component';
import { AcceptConnectionComponent } from './components/accept-connection/accept-connection.component';

import { ConnectionResolverService } from './connection-resolver.service';
import { ConnectionCardListComponent } from 'src/app/shared/components/connection-card-list/connection-card-list.component';

const routes: Routes = [
  {
    path: '',
    component: ConnectionComponent,
    children: [
      { path: 'completed', component: ConnectionCardListComponent, resolve: { connections: ConnectionResolverService } },
      { path: 'requested', component: ConnectionCardListComponent, resolve: { connections: ConnectionResolverService } },
      { path: 'responded', component: ConnectionCardListComponent, resolve: { connections: ConnectionResolverService } },
      { path: 'invited', component: ConnectionCardListComponent, resolve: { connections: ConnectionResolverService } },
      { path: 'new', component: NewConnectionComponent },
      { path: 'accept', component: AcceptConnectionComponent },
      { path: '', redirectTo: 'active' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionRoutingModule { }
