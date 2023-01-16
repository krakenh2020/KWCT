import { Injectable } from '@angular/core';

import socketClient from 'socket.io-client';
import agentJson from '../../config/server-configuration.json';
import { Observable } from 'rxjs';
import { socketIoServerIsRunning } from './socket-io-server-is-running.route';
import { WebHookType } from '../models/web-hook/WebHookType';


@Injectable({
  providedIn: 'root'
})

export class KrakentWebControllerSocketIoService {

  socket;
  my_config = agentJson.configurations;
  socketioclientbaseurl = ($ENV !== undefined && $ENV.SOCKET_IOCLIENT_BASE_URL !== undefined) ? $ENV.SOCKET_IOCLIENT_BASE_URL : this.my_config.SOCKET_IOCLIENT_BASE_URL;
  socketioport = ($ENV !== undefined && $ENV.SOCKET_IO_PORT !== undefined) ?  $ENV.SOCKET_IO_PORT :   this.my_config.SOCKET_IO_PORT;

  constructor() { socketIoServerIsRunning }

  setupSocketIoConnection(): Observable<WebHookType> {
    console.log( 'socketioclientbaseurl :' + this.socketioclientbaseurl );
    console.log( 'socketioport : ' + this.socketioport); 

    //DAVIDE: QUI USARE ENV VARIABLES
    this.socket = socketClient( this.socketioclientbaseurl + ":" + this.socketioport);
    return new Observable((observer) => {
      this.socket.on('webHookControllerMessage', (webHook: WebHookType) => {
        console.log('client side' + JSON.stringify(webHook));
        observer.next(webHook);
      });
    });
  }
}
