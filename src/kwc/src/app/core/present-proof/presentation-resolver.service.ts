import { AgentProofService } from 'src/app/services/present-proof/agent.proof.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresentationResolverService implements Resolve<any[]> {
  
  presentations: any[];

  constructor(private agentService: AgentProofService, private route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.agentService.getPresentations()
    .pipe(
      map((result: any[]) =>{   
        if (result) {      
          return result;
        }else{
          return [];
        }
      })        
    );
  } 
}
