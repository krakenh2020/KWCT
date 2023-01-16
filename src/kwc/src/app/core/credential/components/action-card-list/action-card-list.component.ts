import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'action-card-list',
  templateUrl: './action-card-list.component.html',
  styleUrls: ['./action-card-list.component.scss']
})
export class ActionCardListComponent implements OnInit {
  actions: any[] = [];

  constructor( private route: ActivatedRoute,public router: Router) {}

  ngOnInit() {
    this.route.data.pipe(
      map((data: { actions: any[] }) => this.actions = data.actions || [])
    )
    .subscribe();
  }



}
