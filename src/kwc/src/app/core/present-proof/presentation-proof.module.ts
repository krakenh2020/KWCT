
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { PresentationProofRoutingModule } from './presentation-proof-routing.module';
import { PresentProofComponent } from './components/present-proof-component/present-proof.component';
import { PresentationListComponent } from './components/presentation-card-list/presentation-list.component';
import { PresentationCardComponent } from './components/presentation-card/presentation-card.component';
import { ActionCardComponent } from './components/action-card/action-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionCardListComponent } from './components/action-card-list/action-card-list.component';
import { MaterialModule } from 'src/app/material.module';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { RxReactiveDynamicFormsModule } from '@rxweb/reactive-dynamic-forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    PresentProofComponent,
    ActionCardComponent,
    PresentationListComponent,
    PresentationCardComponent,
    ActionCardListComponent],
  imports: [
    CommonModule,
    SharedModule,
    PresentationProofRoutingModule,
    FormsModule,    
    ReactiveFormsModule,
    RxReactiveFormsModule,
    RxReactiveDynamicFormsModule, 
    MaterialModule,
    FlexLayoutModule
  ]
})
export class PresentationProofModule { }
