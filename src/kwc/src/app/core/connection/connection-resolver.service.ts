import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AgentConnectionService } from '../../services/connection/agent.connection.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConnectionResolverService implements Resolve<any[]> {

  constructor(private agentService: AgentConnectionService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    
  /*  this.agentService.getConnections().subscribe( val => { 
      console.log(val)
    }); */
    
    return this.agentService.getConnections()
      .pipe(
          map((connections: any[]) => {
          // DAVIDE:22/02/2022 added here comments to be used in issue credential or present proof
          connections.forEach( value => {
              value["KwctRuntimeComment"]=""
          })
          if (connections) {
            if (route.routeConfig.path === 'completed') {
              return connections.filter((connection: any) => connection.State === 'completed');
            } else if (route.routeConfig.path === 'requested') {
              return connections.filter((connection: any) => connection.State === 'requested');
            } else if (route.routeConfig.path === 'responded') {
              return connections.filter((connection: any) => connection.State === 'responded');
            } else if (route.routeConfig.path === 'invited') {
              return connections.filter((connection: any) => connection.State === 'invited');
            } else {
              return connections.filter((connection: any) => connection.State === 'completed');
            }
          } else {
            return [];
          }
        })
      );
  }

 
}
