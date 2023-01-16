import { AgentProofService } from 'src/app/services/present-proof/agent.proof.service';
import { NameCredential } from '../../../../models/nameCredential';
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import jsonobj from "../../../../../protocol-test-json/present-proof/accept-request-presentation.json";
import jsonContainer from "../../../../../protocol-test-json/present-proof/presentProofContainerDavide.json"
import jsonfissa from "../../../../../protocol-test-json/present-proof/presentProofDavide.json"
import { map, catchError } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.scss']
})
export class ActionCardComponent implements OnInit {
  
  @Input() presentations: any;
  closeModal: string;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  public presentationAttachJsonData=JSON.stringify(jsonobj.presentation['presentations~attach'][0].data.json,null,1);
  public requestPresentationTemplate=jsonobj;
  comment: string = '';
  credentialId: string = '';
  myDid: string = '';
  signatureType: string;
  
  constructor(
    private agentProofService: AgentProofService, 
    public router: Router,
    private modalService: NgbModal) {}

    ngOnInit() {
    this.comment = this.presentations.Msg.comment;
    this.myDid = this.presentations.MyDID;
    this.credentialId = '';
    this.signatureType = "Ed25519Signature2018";
  }


  /**
   * 
   * @param actions 
   */
  acceptPresentationRequest(actions: any) {

    /*  this.agentProofService.postGeneratePresentationById( this.myDid, this.credentialId, this.signatureType)
        .pipe( map( presentation => {
  
            let pres = presentation;
  
        })).subscribe(); */

    this.agentProofService
      .postAcceptRequestPresentation(actions.PIID, JSON.stringify(jsonfissa))
      .pipe(
        map(() => this.router.navigateByUrl('/present_proof'))
      )
      .subscribe();
  }


  

  // originale
  acceptRequestPresentation(actions: any) {
    if (!actions.PIID ) {
      //eliminare Inutile
      return;
    }

/*    // 1 genera presentation da id della credenziale
    curl -X 'POST' \
  'https://localhost:18512/verifiable/presentation/generatebyid' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "did": "string",
  "id": "string",
  "signatureType": "string"
}'*/


    this.requestPresentationTemplate.presentation['presentations~attach'][0].data.json=JSON.parse(this.presentationAttachJsonData);
    var requestPresentationInput=JSON.stringify(this.requestPresentationTemplate);
    console.log("RequestPresentationInput: "+requestPresentationInput);
    this.agentProofService
    .postAcceptRequestPresentation(actions.PIID,requestPresentationInput)  
      .pipe(
        map(() => this.router.navigateByUrl('/present_proof'))
       ) 
      .subscribe();
  }

  declineRequestPresentation(piid: any) {
    if (!piid ) {      
      return;
    }
    this.agentProofService
      .postDeclineRequestPresentation(piid,"no reason")      
      .pipe(
        map(() => this.router.navigateByUrl('/present_proof'))
       ) 
      .subscribe();
  }

  
  acceptPresentation(actions: any) {
    if (!actions.PIID ) {
      return;
    }
    let names: Array<string> = ["demo-credential-"+Math.random().toString()];
    let nameCredential=new NameCredential(names)
    this.agentProofService
      .postAcceptPresentation(actions.PIID,JSON.stringify(nameCredential))
      .pipe(
        map(() => this.router.navigateByUrl('/present_proof'))
       )     
      .subscribe();
  }

  declinePresentation(piid: string) {
    if (!piid) {
      return;
    }
    this.agentProofService
      .postDeclinePresentation(piid,"no reason")
      .pipe(
        map(() => this.router.navigateByUrl('/present_proof'))
       )     
      .subscribe();
  }

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  passBack() {    
    this.passEntry.emit(this.presentationAttachJsonData);
    this.modalService.dismissAll();
    console.log(JSON.stringify(this.presentationAttachJsonData));
    this.acceptRequestPresentation(this.presentations);
    }
}  

