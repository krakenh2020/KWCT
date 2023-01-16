import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgentConnectionService } from 'src/app/services/connection/agent.connection.service';
import { AgentCredentialService } from 'src/app/services/issue-credential/agent.credential.service';

@Injectable({
  providedIn: 'root'
})
export class CredentialResolverService implements Resolve<any[]> {
  credentials: any[] = [];
  constructor(private agentCredentialService: AgentCredentialService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    /* this.agentCredentialService.getCredentials()
    .pipe(
      map((result: any[]) => {
        result.map((credential: any)=>{
          let id=btoa(credential.id);
          console.log("CredentialCardListComponent - ngOnInit - id: "+id +' - '+credential.id);
          return this.agentCredentialService.getCredentialById(id)
          .pipe(
            map((cred=>{
              console.log("CredentialCardListComponent - ngOnInit - getCredentialById: "+JSON.stringify(cred));
              //this.credentials.push(cred);
            }))
          )
        });
      })
      )   */
    return 
  } 
}
