import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultsComponent } from './components/layouts/defaults.component';
import { NewConnectionComponent } from './core/connection/components/new-connection/new-connection.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: DefaultsComponent,
    children: [

      { path: '', component: NewConnectionComponent },
      
      {
        path: 'web-hook',
        loadChildren: () => import('./core/web-hook-signal/web-hook.module').then(m => m.WebHookModule),
        canActivate: [AuthGuard],
        data: { roles: ['frontend-kwct-user'] }
      },
      
      {
        path: 'connections',
        loadChildren: () => import('./core/connection/connection.module').then(m => m.ConnectionModule),
        canActivate: [AuthGuard],
        data: { roles: ['frontend-kwct-user'] }
      },
      {
        // path: 'issue credentials'
        path: 'credentials',
        loadChildren: () => import('./core/credential/credential.module').then(m => m.CredentialModule),
        canActivate: [AuthGuard],
        data: { roles: ['frontend-kwct-user'] }},
      {
        // path: 'proofs',
        path: 'present_proof',
        loadChildren: () => import('./core/present-proof/presentation-proof.module').then(m => m.PresentationProofModule),
        canActivate: [AuthGuard],
        data: { roles: ['frontend-kwct-user'] }
      }

    ]
  }];

@NgModule({
      imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
      exports: [RouterModule]
    })
export class AppRoutingModule { }
