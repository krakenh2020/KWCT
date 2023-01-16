import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentConnectionService } from 'src/app/services/connection/agent.connection.service'
import { Subscription } from 'rxjs'



@Component({
  selector: 'app-qrcode-generation',
  templateUrl: './qrcode-generation.component.html',
  styleUrls: ['./qrcode-generation.component.scss']
})
export class QrcodeGenerationComponent implements OnInit, OnDestroy {
  public myAngularxQrCode: string = null;

  agentInvitation: Subscription;


  constructor(private agent: AgentConnectionService) {


  }

  ngOnInit() {
    try {
      let agentInvitation = this.agent.createInvitation();
      agentInvitation.subscribe(
        (data) => {
          if (data) {
          if ( data.invitation.serviceEndpoint == undefined ) 
          {
              data.invitation['serviceEndpoint']= null
          }
          this.myAngularxQrCode = JSON.stringify(data.invitation);
          }
        }
      )
 //     this.myAngularxQrCode = 'Kraken QR code DAVIDE';
    }
    catch (ex) {
      console.log("errore");
    }
  }

  ngOnDestroy() {
    this.agentInvitation.unsubscribe();
  }

}
