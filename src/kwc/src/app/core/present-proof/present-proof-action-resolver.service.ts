import { AgentProofService } from 'src/app/services/present-proof/agent.proof.service';
import { AgentCredentialService } from 'src/app/services/issue-credential/agent.credential.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { AgentConnectionService } from '../../services/connection/agent.connection.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresentProofActionResolverService implements Resolve<any[]> {
  
  actions: any[] = [];
  ACCEPT_PRESENTATION_REQUEST_TYPE="https://didcomm.org/present-proof/2.0/request-presentation"
  ACCEPT_PRESENTATION_TYPE="https://didcomm.org/present-proof/2.0/presentation"
  
  constructor(private agentProofService: AgentProofService, private route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.agentProofService.getPresentProofActions()
      .pipe(       
        map((actions: any[]) => {
          if (route.routeConfig.path === 'accept-presentation-request') {
            return actions.filter(action => JSON.stringify(action).includes(this.ACCEPT_PRESENTATION_REQUEST_TYPE));
          }else if (route.routeConfig.path === 'accept-presentation') {   
            return actions.filter(action =>JSON.stringify(action).includes(this.ACCEPT_PRESENTATION_TYPE));            
          } else {
            return [];
          }
        })
      );
  } 
}
