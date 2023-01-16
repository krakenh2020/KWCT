import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresentProofComponent } from './components/present-proof-component/present-proof.component';
import { PresentationListComponent } from './components/presentation-card-list/presentation-list.component';
import { PresentProofActionResolverService } from './present-proof-action-resolver.service';
import { PresentationResolverService } from './presentation-resolver.service';
import { ConnectionCardListComponent } from 'src/app/shared/components/connection-card-list/connection-card-list.component';
import { ActionCardListComponent } from './components/action-card-list/action-card-list.component';
import { ConnectionResolverService } from '../connection/connection-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PresentProofComponent,
    children: [
      { path: 'presentations', component: PresentationListComponent,resolve: { result: PresentationResolverService } },
      { path: 'send-presentation', component: ConnectionCardListComponent,resolve: { connections: ConnectionResolverService } },      
      { path: 'accept-presentation-request', component: ActionCardListComponent, resolve: { actions: PresentProofActionResolverService }},
      { path: 'accept-presentation', component: ActionCardListComponent,resolve: { actions: PresentProofActionResolverService }},
      { path: '', redirectTo: 'active' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresentationProofRoutingModule { }
