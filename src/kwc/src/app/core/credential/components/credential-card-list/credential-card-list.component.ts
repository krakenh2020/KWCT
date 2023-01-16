import { AgentCredentialService } from 'src/app/services/issue-credential/agent.credential.service';
import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'credential-card-list',
  templateUrl: './credential-card-list.component.html',
  styleUrls: ['./credential-card-list.component.scss']
})
export class CredentialCardListComponent implements OnInit {
  credentials: any[] = [];

  constructor(
    private agentCredentialService: AgentCredentialService,
    private logger: NGXLogger
  ) { }

  ngOnInit() {
    console.log()
    this.agentCredentialService.getCredentials()
      .pipe(
        map((result: any[]) => {
          this.logger.info('getCredentials: ', result);
          if (result) {
            result.map((credential: any) => {
              let id = btoa(credential.id);
              this.agentCredentialService.getCredentialById(id)
                .pipe(
                  map((cred => {
                    this.logger.info('getCredentialById: ', cred);
                    this.credentials.push(JSON.parse(cred.verifiableCredential));
                  }))
                ).subscribe();
            })
          } else {
            return []
          }
        }))
      .subscribe();

  }

}
