
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { CredentialRoutingModule } from './credential-routing.module';
import { CredentialComponent } from './components/credential-component/credential.component';
import { CredentialCardComponent } from './components/credential-card/credential-card.component';
import { ActionCardComponent } from './components/action-card/action-card.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveDynamicFormsModule } from '@rxweb/reactive-dynamic-forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { MaterialModule } from 'src/app/material.module';
import { ActionCardListComponent } from './components/action-card-list/action-card-list.component';
import { CredentialCardListComponent } from './components/credential-card-list/credential-card-list.component';
import { DefaultWidgetRegistry, SchemaFormModule, WidgetRegistry } from 'ngx-schema-form';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    CredentialComponent,
    ActionCardComponent,
    CredentialCardListComponent,
    CredentialCardComponent,
    ActionCardListComponent],
  imports: [
    CommonModule,
    SharedModule,
    CredentialRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    RxReactiveDynamicFormsModule,
    MaterialModule,
    FlexLayoutModule, 
    SchemaFormModule.forRoot()
  ],
  providers: [{ provide: WidgetRegistry, useClass: DefaultWidgetRegistry }],
  bootstrap: [CredentialComponent]
})
export class CredentialModule { }
