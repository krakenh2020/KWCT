import { Component, OnInit } from '@angular/core';
import {UiSyncronizerService} from '../../../services/uiSyncronizer/ui-syncronizer.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  
  constructor(private uiSyncronizerService: UiSyncronizerService) { 

    
  }

  ngOnInit(): void {
  }

  setActiveItem( name: string ){

    this.uiSyncronizerService.activeItem = name;

  }

  get activeItem(): string {

     return this.uiSyncronizerService.activeItem;
  }

  isActive( name: string): boolean{

    return this.activeItem == name; 
  }

}
