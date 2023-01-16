import { Injectable, Optional } from '@angular/core';
import { WebHookType } from 'src/app/models/web-hook/WebHookType';
import { KrakentWebControllerSocketIoService } from 'src/app/services/krakent-web-controller-socket-io.service';

@Injectable({
  providedIn: 'root'
})
export class WebHookService {
  public webhooks: WebHookType[]
 
  constructor( private krakentWebControllerSocketIoService: KrakentWebControllerSocketIoService) { 
    let webHooks = this.krakentWebControllerSocketIoService.setupSocketIoConnection();
    let i=0;
    webHooks.subscribe((webHook) => {
        if (webHook) {
          console.log("add message: "+JSON.stringify(webHook))
          webHook.rowNum=i;
          this.webhooks.push(webHook);
          i++;
        }
    });
    this.webhooks = new Array<WebHookType>()
  }

  
  
}
