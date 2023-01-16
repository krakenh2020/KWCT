import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { AgentProofService } from 'src/app/services/present-proof/agent.proof.service';
import { ProtocolDetailDialogService } from 'src/app/shared/components/dialog-detail/protocol-detail-dialog.service';

@Component({
  selector: 'verifiable-presentation-card',
  templateUrl: './presentation-card.component.html',
  styleUrls: ['./presentation-card.component.scss']
})
export class PresentationCardComponent implements OnInit {
  @Input() verifiedPresentation: any;
  
  constructor( 
    public router: Router,
    private agentProofService:AgentProofService,
    private protocolDetailDialogService: ProtocolDetailDialogService) {

   }

  ngOnInit() {
  }

  removePresentationByName(presentationName:string) {
    this.agentProofService
      .removePresentationByName(presentationName)      
      .pipe(
        map(() => this.router.navigateByUrl('/present_proof'))
       ) 
      .subscribe();
  }

  getDetail() {
    console.log("Get verified Presentation detail: " +JSON.stringify(this.verifiedPresentation));
    this.protocolDetailDialogService.openDialog("Verified presentation details", this.verifiedPresentation);
  }

}
