import { AgentProofService } from './../../../services/present-proof/agent.proof.service';
import { CredentialOffer } from '../../../models/credential-offer';
import { } from '@angular/cdk'

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { AgentConnectionService } from "src/app/services/connection/agent.connection.service";


import { AgentCredentialService } from "src/app/services/issue-credential/agent.credential.service";
import { RequestPresentation } from 'src/app/models/request-presentation';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProtocolDetailDialogService } from '../dialog-detail/protocol-detail-dialog.service';
import {SubjectTemplateService} from '../../../services/subject-template/subject-template.service';
import {UiSyncronizerService} from '../../../services/uiSyncronizer/ui-syncronizer.service'
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: "connection-card",
  templateUrl: "./connection-card.component.html",
  styleUrls: ["./connection-card.component.scss"]
})
export class ConnectionCardComponent implements OnInit {
  @Input() connection: any;
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  isSendOfferTab: boolean;
  isPresentProofTab: boolean;
  KwctRuntimeComment: string;
  KwctChoosedSchemaID: string;
  KwctChoosedSchemaURL: string;
  // not used until now
  KwctChoosedSchemaNAME: string;
  

  constructor(
    private agentService: AgentConnectionService,
    private agentCredentialService: AgentCredentialService,
    private agentProof: AgentProofService,
    private router: Router,
    public matDialog: MatDialog,
    private protocolDetailDialogService: ProtocolDetailDialogService,
    private uiSyncronizerService: UiSyncronizerService
    
    ) {

  }

  ngOnInit() {
    this.isSendOfferTab = this.router.url == '/credentials/send-offer';
    this.isPresentProofTab = this.router.url == '/present_proof/send-presentation';
    this.KwctChoosedSchemaID = '';
    this.KwctChoosedSchemaURL = '';
    this.KwctChoosedSchemaNAME = '';
    this.KwctRuntimeComment = '';
    
   
   


    console.log('router: ' + this.router.url)
  }

  removeConnection(connection: any) {
    this.remove.emit(connection);
  }

  acceptInvitation(connection: any) {
    alert("Connection yet estabilished");
    if (!connection.ConnectionID && connection.State === "invited") {
      return;
    }
    this.agentService
      .acceptInvitation(connection.ConnectionID)
      .pipe(map(() => this.router.navigateByUrl("/connections")))
      .subscribe();
  }

  acceptRequest(connection: any) {
    if (!connection.ConnectionID && connection.State === "invited") {
      return;
    }
    this.agentService
      .acceptRequest(connection.ConnectionID)
      .pipe(map(() => this.router.navigateByUrl("/connections")))
      .subscribe();
  }

  sendOffer(connection: any, schemaID: string, schemaURL: string, comment: string) {
    if (!connection.ConnectionID && connection.State === "completed") {
      return;
    }
    console.log("connection: " + JSON.stringify(connection))
    let offer = new CredentialOffer(connection.MyDID, connection.TheirDID, schemaID, schemaURL, this.KwctRuntimeComment)
    let str = JSON.stringify(offer);
    console.log("jsonObject: " + str)
    this.agentCredentialService
      .postSendOffer(str)
      .pipe(map(() => this.router.navigateByUrl("/credentials")))
      .subscribe();
  }

  sendPresentationRequest(connection: any) {
    if (!connection.ConnectionID && connection.State === "completed") {
      return;
    }
    console.log("connection: " + JSON.stringify(connection))

    let presentationRequest = new RequestPresentation(connection.MyDID, connection.TheirDID, this.KwctRuntimeComment)
    let presentationRequestStr = JSON.stringify(presentationRequest);

    console.log("jsonObject: " + presentationRequestStr)
    this.agentProof
      .postSendRequestPresentation(presentationRequestStr)
      .pipe(map(() => this.router.navigateByUrl("/present_proof")))
      .subscribe();
  }

  getDetail() {
    console.log("Get connection detail: " +JSON.stringify(this.connection));
    this.protocolDetailDialogService.openDialog("Connection details", this.connection);
  }

  /**
   * get templates from schema index file
   */
  get credentialSchemaList(){

    return this.uiSyncronizerService.kwctSchemaList;
  }

  get isAnonymousConnection() : boolean {

    return true;
  }

  get anonymousLabel() : string {

    return "anonymous";
  }


  schemaChanged( event: any ){

     this.KwctChoosedSchemaID = event.value.ID;
     this.KwctChoosedSchemaURL = event.value.url;
     this.KwctChoosedSchemaNAME = event.value.name;
   }

   get isConnectionTab(): boolean{

      return !(this.isPresentProofTab || this.isSendOfferTab )

   }
}
