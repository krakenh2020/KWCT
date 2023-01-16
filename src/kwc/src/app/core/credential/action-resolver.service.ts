import { AgentCredentialService } from 'src/app/services/issue-credential/agent.credential.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { AgentConnectionService } from '../../services/connection/agent.connection.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionResolverService implements Resolve<any[]> {

  actions: any[] = [];
  OFFER_CREDENTIAL_TYPE='https://didcomm.org/issue-credential/2.0/offer-credential';
  REQUEST_CREDENTIAL_TYPE='https://didcomm.org/issue-credential/2.0/request-credential';
  ACCEPT_REQUEST_TYPE='https://didcomm.org/issue-credential/2.0/issue-credential';
  constructor(private agentService: AgentCredentialService, private route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    let miaRoute = route.routeConfig.path;
    return this.agentService.getPiid()
      .pipe(       
        map((actions: any[]) => {
          if (route.routeConfig.path === 'accept-offer') {                   
            return actions.filter(action =>JSON.stringify(action).includes(this.OFFER_CREDENTIAL_TYPE));            
          } else if (route.routeConfig.path === 'accept-request') {
            return actions.filter(action =>JSON.stringify(action).includes(this.REQUEST_CREDENTIAL_TYPE));                        
          } else if (route.routeConfig.path === 'accept-credential') {            
            return actions.filter(action =>JSON.stringify(action).includes(this.ACCEPT_REQUEST_TYPE));                                   
          } else {
            return [];
          }
        })
      );
  } 

 
}
