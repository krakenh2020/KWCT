import { AgentProofService } from '../../../../services/present-proof/agent.proof.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'action-card-list',
  templateUrl: './action-card-list.component.html',
  styleUrls: ['./action-card-list.component.scss']
})
export class ActionCardListComponent implements OnInit {
  presentations: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.pipe(
      map((data: { actions: any[] }) => 
      this.presentations = data.actions || [])
    )
    .subscribe();
  }

  onSubmit() {
    
  }

}
