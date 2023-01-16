import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AgentConnectionService } from 'src/app/services/connection/agent.connection.service';

import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'connection-list',
  templateUrl: './connection-card-list.component.html',
  styleUrls: ['./connection-card-list.component.scss']
})
export class ConnectionCardListComponent implements OnInit {
  connections: any[] = [];
  isSendOfferTab:boolean
  constructor(private agentService: AgentConnectionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isSendOfferTab=this.route.snapshot.url.join('')=='send-offer'
    console.log('router: '+this.route.snapshot.url.join(''))
    this.route.data
      .pipe(
        map((data: { connections: any[] }) => 
        this.connections = data.connections || [])
      )
      .subscribe();
  }

  onRemoveConnection(connection: any) {
    this.agentService.removeConnection(connection.ConnectionID)
      .pipe(
        filter((connectionId: string) => !! connectionId),
        map((connectionId: string) =>
          this.connections = this.connections.filter((conn: any) => conn.ConnectionID !== connectionId))
      )
      .subscribe();
  }

}
