import { Component, OnInit } from '@angular/core';
import config from '../../../config/server-configuration.json';
import { KrakentWebControllerSocketIoService } from 'src/app/services/krakent-web-controller-socket-io.service';
import { WebHookService } from 'src/app/core/web-hook-signal/web-hook-component/web-hook.service';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ///////////Auth section///////////
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username?: string;
  ///////////Auth section///////////

  title = "KWCT";


  constructor(
    private krakentWebControllerSocketIoService: KrakentWebControllerSocketIoService, 
    public webHookService: WebHookService,
    private logger: NGXLogger) {
    this.title = $ENV.TITLE !== undefined ? $ENV.TITLE : config.configurations.TITLE;
    
  }

  ngOnInit() {
    let TITLE = $ENV.TITLE !== undefined ? $ENV.TITLE : config.configurations.TITLE;
    let BACKEND_HOST_NAME = $ENV.BACKEND_HOST_NAME !== undefined ? $ENV.BACKEND_HOST_NAME : config.configurations.BACKEND_HOST_NAME;
    let BACKEND_PORT = $ENV.BACKEND_PORT !== undefined ? ":" + $ENV.BACKEND_PORT : ":" + config.configurations.BACKEND_PORT;
    let SOCKET_IOCLIENT_BASE_URL = $ENV.SOCKET_IOCLIENT_BASE_URL !== undefined ? $ENV.SOCKET_IOCLIENT_BASE_URL : config.configurations.SOCKET_IOCLIENT_BASE_URL;
    let SOCKET_IO_PORT = $ENV.SOCKET_IO_PORT !== undefined ? $ENV.SOCKET_IO_PORT : config.configurations.SOCKET_IO_PORT;
    let KEYCLOAK_URL = $ENV.KEYCLOAK_URL !== undefined ? $ENV.KEYCLOAK_URL : config.configurations.KEYCLOAK_URL + '/auth';
    let KEYCLOAK_REALM = $ENV.KEYCLOAK_REALM !== undefined ? $ENV.KEYCLOAK_REALM : config.configurations.KEYCLOAK_REALM;
    let KEYCLOAK_CLIENT_ID = $ENV.KEYCLOAK_CLIENT_ID !== undefined ? $ENV.KEYCLOAK_CLIENT_ID : config.configurations.KEYCLOAK_CLIENT_ID;

    this.logger.info("------------PROPERY------------")
    this.logger.info("TITLE: " + TITLE);
    this.logger.info("BACKEND_HOST_NAME: " + BACKEND_HOST_NAME);
    this.logger.info("BACKEND_PORT: " + BACKEND_PORT);
    this.logger.info("SOCKET_IOCLIENT_BASE_URL: " + SOCKET_IOCLIENT_BASE_URL);
    this.logger.info("SOCKET_IO_PORT: " + SOCKET_IO_PORT);
    this.logger.info("KEYCLOAK_URL: " + KEYCLOAK_URL);
    this.logger.info("KEYCLOAK_REALM: " + KEYCLOAK_REALM);
    this.logger.info("KEYCLOAK_CLIENT_ID: " + KEYCLOAK_CLIENT_ID);
    this.logger.info("------------PROPERY------------")

    try {
        this.krakentWebControllerSocketIoService.setupSocketIoConnection();
    }
    catch (ex) {
      console.log("errore");
      alert("errore nella ricezione di un web hook");
    }
  }

  logout(): void {
    
  }

}
