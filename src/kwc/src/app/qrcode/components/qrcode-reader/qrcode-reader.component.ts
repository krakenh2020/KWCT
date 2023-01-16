import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { AgentConnectionService } from 'src/app/services/connection/agent.connection.service';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';



@Component({
  selector: 'app-qrcode-reader',
  templateUrl: './qrcode-reader.component.html',
  styleUrls: ['./qrcode-reader.component.scss']
})
export class QrcodeReaderComponent implements OnInit {
   public myAngularxQrCode: string = null;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResult: String;
  qrInvitation:any;
  
  

  constructor(private agent: AgentConnectionService, private router: Router) { 

    this.qrResult= "inizializzato Davide";
    this.qrInvitation = null;

  };

  ngOnInit(): void {
    
  }
  
  
  clearResult(): void {
    this.qrResult = "";
  }

  onCodeResult(resultString: string): void {
  
      alert( resultString)
      this.qrResult = resultString;
      this.qrInvitation = JSON.parse(resultString)
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  // Bottone
  clickMessage = '';

  onSendInvitation() {
    try {
    //  let agentReceiveInvitation = this.agent.receiveInvitation(this.qrInvitation);
      this.agent.receiveInvitation(this.qrInvitation)
      .pipe(
        map(() => this.router.navigateByUrl('/connections')),
        catchError( err => of([]))
      )
      .subscribe(
        res => alert("send invitation OK!, response : " + JSON.stringify(res)),
        err => alert("errore in routing")
      );
    }
    catch (ex) {
      alert ("errore in receiveInvitation");
    }
  }
}


  


