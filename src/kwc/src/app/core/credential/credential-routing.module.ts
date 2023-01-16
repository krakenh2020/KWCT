
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CredentialComponent } from './components/credential-component/credential.component';
import { ActionResolverService } from './action-resolver.service';
import { ActionCardListComponent } from './components/action-card-list/action-card-list.component';
import { CredentialCardListComponent } from './components/credential-card-list/credential-card-list.component';
import { ConnectionCardListComponent } from 'src/app/shared/components/connection-card-list/connection-card-list.component';
import { ConnectionResolverService } from '../connection/connection-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CredentialComponent,
    children: [
      { path: 'credentials', component: CredentialCardListComponent },
      { path: 'send-offer', component: ConnectionCardListComponent,resolve: { connections: ConnectionResolverService } },      
      { path: 'accept-offer', component: ActionCardListComponent, resolve: { actions: ActionResolverService }},
      { path: 'accept-request', component: ActionCardListComponent,resolve: { actions: ActionResolverService }},
      { path: 'accept-credential', component: ActionCardListComponent,resolve: { actions: ActionResolverService }},
      { path: '', redirectTo: 'active' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredentialRoutingModule { }
