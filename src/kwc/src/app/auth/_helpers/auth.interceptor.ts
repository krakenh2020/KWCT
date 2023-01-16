import { HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { Observable } from "rxjs";

import agentJSon from "../../../config/server-configuration.json";
import bodyParser from "body-parser";

@Injectable()
/**
 * HttpInterceptor has intercept() method to inspect and transform HTTP requests before
 * they are sent to server.
 * AuthInterceptor implements HttpInterceptor.
 * We’re gonna add Authorization header with ‘Bearer’ prefix to the token.
 */
export class AuthInterceptor implements HttpInterceptor {
  hostname: string;
  port: string;
  formattedAgentUrl: string;
  constructor() {
    this.hostname =
      $ENV.BACKEND_HOST_NAME !== undefined
        ? $ENV.BACKEND_HOST_NAME
        : agentJSon.configurations.BACKEND_HOST_NAME;
    this.port =
      $ENV.BACKEND_PORT !== undefined
        ? ":" + $ENV.BACKEND_PORT
        : ":" + agentJSon.configurations.BACKEND_PORT;
    
    this.formattedAgentUrl = `${this.hostname}` + this.port;
    console.log("Backand is running on: " + this.formattedAgentUrl);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    
    if (authReq.url.startsWith('https://raw.githubusercontent.com/krakenh2020/vc-schemas',0)){
      
      console.log('Intercept: '+authReq.url);
      return next.handle(authReq)
    } 
    
    authReq = req.clone({
      setHeaders: { "Access-Control-Allow-Origin": "*","Content-Type":"application/json" },                        
      url: this.formattedAgentUrl + authReq.url,
      body: req.body
    });
    console.log("Interceptor no token - authReq body: "+authReq.body)
    
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
