/* davide 21/06/2020 ( @franz ) questo modulo è utilizzato per dichiarare i componenti utilizzati 
   nella view qrcode 
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';
import { QRCodeRoutingModule} from './qrcode-routing.module';
import { QrcodeGenerationComponent } from './components/qrcode-generation/qrcode-generation.component';
import { QrcodeReaderComponent} from './components/qrcode-reader/qrcode-reader.component';
import { ZXingScannerModule } from "@zxing/ngx-scanner";

@NgModule({ 
  declarations: [QrcodeGenerationComponent, QrcodeReaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    QRCodeRoutingModule,
    QRCodeModule,
    ZXingScannerModule
    

  ]
})
export class QRCodeInfocertModule { }
