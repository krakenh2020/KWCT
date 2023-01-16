import { NameCredential } from '../../../../models/nameCredential';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AgentCredentialService } from 'src/app/services/issue-credential/agent.credential.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CredentialEntityFactory } from 'src/app/models/credential/credentialEntityFactory';
import { CommentDialogComponent } from 'src/app/shared/components/dialog-comment/comment-dialog/comment-dialog.component';
import * as uuid from 'uuid';
import { SubjectTemplateComponent } from 'src/app/shared/components/dialog-subject-template/subject-template-dialog/subject-template.component';
import { NGXLogger } from 'ngx-logger';
import { CredentialRequest } from '../../../../models/credential-request'

@Component({
  selector: 'action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent implements OnInit {
  @Input() actions: any;

  claims: any;
  vc_credential_schema_url: string;
  vc_schema_id: string;
  comment: string;
  isKwctCredentialAction: boolean;

  constructor(
    private agentCredentialService: AgentCredentialService,
    public router: Router,
    public matDialog: MatDialog,
    public matDialog1: MatDialog,
    private logger: NGXLogger,
  ) { }

  ngOnInit() {

    // workaround to avoid tilde in identifier and to change the tag in the json

    this.isKwctCredentialAction = true;
    switch (this.router.url) {

      case '/credentials/accept-offer': {
        try {
          // this.vc_credential_schema_url = this.actions.Msg.'offers~attach'[0].data.links[0]
          this.vc_credential_schema_url = this.removeTildeFrom(this.actions.Msg).offers_attach[0].data.links[0];
          this.vc_schema_id = this.removeTildeFrom(this.actions.Msg).offers_attach[0].description;
        } catch (error) {

          this.isKwctCredentialAction = false;
          // do nothing - case not KWCT actions

        }
        break;
      }


      case '/credentials/accept-request' || '/credentials/accept-request': {
        try {
          this.vc_credential_schema_url = this.removeTildeFrom(this.actions.Msg).requests_attach[0].data.links[0];
          this.vc_schema_id = this.removeTildeFrom(this.actions.Msg).requests_attach[0].description;
          break;
        }
        catch (error) {
           // do nothing - case not KWCT actions
          this.isKwctCredentialAction = false;
        }
      }
    }

        this.comment = this.actions.Msg.comment;
    }

  removeTildeFrom(msg) {

    var myMsg: string = JSON.stringify(msg);
    return JSON.parse(myMsg.replace('~', '_'))
  }

  sendRequest(actions: any) {
    this.logger.info('sendRequest')

    let request = new CredentialRequest(actions.MyDID, actions.TheirDID, this.vc_schema_id, this.vc_credential_schema_url, this.comment, this.isKwctCredentialAction)
    let str = JSON.stringify(request);
    console.log("send request jsonObject: " + str)
    this.agentCredentialService
      .postSendRequest(str)
      .pipe(map(() => this.router.navigateByUrl('/credentials')))
      .subscribe();
  }

  acceptOffer(actions: any) {
    this.logger.info('acceptOffer', actions.PIID)
    if (!actions.PIID) { return; }
    this.agentCredentialService
      .postAcceptOffer(actions.PIID, actions.Msg.comment)
      .pipe(map(() => this.router.navigateByUrl('/credentials')))
      .subscribe();
  }

  acceptRequest(actions: any) {
    this.logger.info('acceptRequest', actions.PIID)
    if (!actions.PIID) {
      return;
    }

    //let issueCredential = CredentialEntityFactory.createIssueCredential(this.claims, this.vc_schema_name +uuid.v4().toString().substring(0,5), actions.MyDID, this.comment);

    // crea json richiesta di firma
    let signRequest = CredentialEntityFactory.createSignRequest(actions.MyDID, this.claims, 'http://example.edu/credentials/' + uuid.v4().toString().substring(0, 5));
    this.logger.info('SignRequest: ', JSON.stringify(signRequest))
    // davide: verificare dettaglio metodo ( questo dovrebbe firmare la credenziale)
    this.agentCredentialService.postVerifiableCredential(JSON.stringify(signRequest))
      .pipe(map((res: any) => {
        // 
        let signedCredential = res.verifiableCredential;
        this.logger.info('PostVerifiableCredential response: ', JSON.stringify(signedCredential, null, 4))
        // crea il json di acceptRequest   
        //DAVIDE, ecco perchè non firma... non usa la credenziale firmata     */
        let issueCredential = CredentialEntityFactory.createSignedIssueCredential(signedCredential, this.comment);
        this.logger.info('issueCredential ', JSON.stringify(issueCredential, null, 4))
        // fa la post dell'issue credential
        this.agentCredentialService.postAcceptRequest(actions.PIID, JSON.stringify(issueCredential))
          .pipe(map((res: any) => {
            let result = JSON.stringify(res, null, 4);
            this.logger.info('postAcceptRequest response ', result)
            this.router.navigateByUrl('/credentials')
          })).subscribe();
      })).subscribe();
  }

  acceptCredential(actions: any) {
    this.logger.info('acceptCredential: ', actions.PIID)
    if (!actions.PIID) { return; }
    let names: Array<string> = ["demo-credential-" + Math.random().toString()];
    let nameCredential = new NameCredential(names)
    this.agentCredentialService
      .postAcceptCredential(actions.PIID, JSON.stringify(nameCredential))
      .pipe(map(() => this.router.navigateByUrl('/credentials')))
      .subscribe();
  }

  declineOffer(piid: any) {
    this.logger.info('declineOffer: ', piid)
    if (!piid) { return; }
    this.agentCredentialService
      .postDeclineOffer(piid, "no reason")
      .pipe(map(() => this.router.navigateByUrl('/credentials')))
      .subscribe();
  }

  declineRequest(piid: any) {
    this.logger.info('declineRequest: ', piid)
    if (!piid) { return; }
    this.agentCredentialService
      .postDeclineRequest(piid, "no reason")
      .pipe(map(() => this.router.navigateByUrl('/credentials')))
      .subscribe();
  }

  declineCredential(piid: any) {
    this.logger.info('declineCredential: ', piid)
    if (!piid) { return; }
    this.agentCredentialService
      .postDeclineCredential(piid, "no reason")
      .pipe(map(() => this.router.navigateByUrl('/credentials')))
      .subscribe();
  }

  addComment() {
    this.logger.info('addComment: ')
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: "Insert a comment",
      comment: this.comment
    };

    const dialogRef = this.matDialog.open(CommentDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.logger.info('afterClosed: ', data)
        this.comment = data.comment;
      }
    );

  }

  /* --------------------------------------------------------------------------- */
  /**
   *  FIX versione v0.1.7 dell'agent go
   *  DAVIDE: * richiamato al salvataggio della dialog che raccoglie i valori della credenziale
   * 
   * 
   */
  changeSubject() {
    this.logger.info('changeSubject: ')

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.matDialog.open(SubjectTemplateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (!!data) {
          this.logger.info('afterClosed: ', data)
          this.claims = data.data;
          //DAVIDE: valorizzazione schema url x fix su agent v.0.1.7
          this.vc_credential_schema_url = data.vc_schema_url;
          //this.vc_schema_name = data.ID;
          this.acceptRequest(this.actions);
        } else {
          this.logger.info('afterClosed: ')
        }
      }
    );
  }


}

