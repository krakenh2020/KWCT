import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import config from "../../../../config/server-configuration.json";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  public title!:string;
  constructor(private autService: AuthService) {
    this.title=$ENV.TITLE !== undefined ? $ENV.TITLE : config.configurations.TITLE;
  }

  logout() {
    this.autService.logout();
  }


}
