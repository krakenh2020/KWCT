/* davide 21/06/2020 ( @franz )questo modulo gestisce il routing all'interno della vista
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrcodeReaderComponent } from '../qrcode/components/qrcode-reader/qrcode-reader.component';
import { QrcodeGenerationComponent} from '../qrcode/components/qrcode-generation/qrcode-generation.component'


const routes: Routes = [
  {
    path: '',
    component: QrcodeGenerationComponent,
    children: [
      { path: '', component: QrcodeGenerationComponent }
    ]
  },
  {
    path: 'readQRCode',
    component: QrcodeReaderComponent,
    children: [
      { path: 'readQRCode', component: QrcodeReaderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QRCodeRoutingModule { }
