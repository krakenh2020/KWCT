import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ConnectionRoutingModule } from './connection-routing.module';
import { ConnectionComponent } from './components/connection/connection.component';

import { NewConnectionComponent } from './components/new-connection/new-connection.component';
import { AcceptConnectionComponent } from './components/accept-connection/accept-connection.component';
import { QRCodeRoutingModule } from '../../qrcode/qrcode-routing.module';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { RxReactiveDynamicFormsModule } from '@rxweb/reactive-dynamic-forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    ConnectionComponent,
    NewConnectionComponent,
    AcceptConnectionComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    RxReactiveDynamicFormsModule,    
    MaterialModule,
    ReactiveFormsModule,
    ConnectionRoutingModule,
    QRCodeRoutingModule,
    QRCodeModule,
    ZXingScannerModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [ConnectionComponent],
  entryComponents: []
})
export class ConnectionModule { }
