import { Component, OnInit } from '@angular/core';

import { AgentProofService } from 'src/app/services/present-proof/agent.proof.service';

import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'presentation-list',
  templateUrl: './presentation-card-list.component.html',
  styleUrls: ['./presentation-card-list.component.scss']
})
export class PresentationListComponent implements OnInit {
  presentations: any[] = [];

  constructor(private agentService: AgentProofService,private route: ActivatedRoute) { }

  
  ngOnInit() {
    this.route.data
    .pipe(
      map((data: { result: any[] }) => this.presentations = data.result )
    )
    .subscribe();
  }

}
