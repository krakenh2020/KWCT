import {
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpErrorResponse,
    HttpInterceptor
  } from "@angular/common/http";
  import { Observable, throwError } from "rxjs";
  import { catchError, finalize } from "rxjs/operators";

  
  import { Injectable } from "@angular/core";
import { ErrorDialogService } from "./error-dialog.service";
  
  @Injectable()
  export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
      private errorDialogService: ErrorDialogService,
      
    ) {}
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          console.error("Error from error interceptor", error);
          this.errorDialogService.openDialog(error.message ?? JSON.stringify(error), error.status);
          return throwError(error);
        }),
        finalize(() => {
          
        })
      ) as Observable<HttpEvent<any>>;
    }
  }
  