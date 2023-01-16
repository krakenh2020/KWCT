import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebHookSignalComponent } from './web-hook-component/web-hook-signal.component';


const routes: Routes = [
  {
    path: '',
    component: WebHookSignalComponent,
    children: [
      
      { path: '', component: WebHookSignalComponent },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebHookRoutingModule { }
