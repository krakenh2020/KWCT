import { Component, OnInit, Input } from '@angular/core';
import { AgentCredentialService } from 'src/app/services/issue-credential/agent.credential.service';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProtocolDetailDialogService } from 'src/app/shared/components/dialog-detail/protocol-detail-dialog.service';
import { NGXLogger } from 'ngx-logger';
@Component({
  selector: 'credential-card',
  templateUrl: './credential-card.component.html',
  styleUrls: ['./credential-card.component.scss']
})
export class CredentialCardComponent implements OnInit {
  @Input() credential: any;
  parsedVC: any;
  constructor(
    private logger: NGXLogger,
    private agentCredentialService: AgentCredentialService,
    public router: Router,
    private protocolDetailDialogService: ProtocolDetailDialogService) { }

  ngOnInit() {
    this.logger.info('Credential: ', this.credential);
    this.parsedVC = JSON.parse(JSON.stringify(this.credential, null, 4).replace(/\\/g, ""));
  }

  removeCredential() {
    this.agentCredentialService.getCredentials()
      .pipe(
        map((result: any[]) => {
          if (result) {
            result.map((credential: any) => {
              if (credential.id === this.credential.id) {
                this.logger.info('remove credential by name: ', credential.name);
                this.agentCredentialService
                  .postRemoveCredential(credential.name)
                  .subscribe();
              }
            })
          } 
        })).subscribe(
          data=>{
          this.router.navigateByUrl('/credentials')}
          );

    /* this.agentCredentialService.getCredentialById(id)
      .pipe(
        map((cred => {
          this.logger.info('getCredentialById: ', cred);
          alert(JSON.stringify(cred))
          this.agentCredentialService
          .postRemoveCredential(cred.name)
          .subscribe();
        }))
      ).subscribe(); */


  }

  getDetail() {
    this.logger.info('getDetail');
    this.protocolDetailDialogService.openDialog("Credential details", this.parsedVC);
  }


}
