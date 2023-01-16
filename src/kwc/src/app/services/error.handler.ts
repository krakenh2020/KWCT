import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ErrorHandler {
  errorMsg: string;

  public handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      if (error.error instanceof ErrorEvent) {
        this.errorMsg = `Error: ${error.error.message}`;
    } else {
        this.errorMsg = this.getServerErrorMessage(error);
    }
      console.error(`${operation} failed: ${this.errorMsg}`);
      
      return throwError(this.errorMsg);
    };
  }


  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}

  public validateSingleInputString(toValidate:string):boolean{
    if (!toValidate) {
      console.error("Must provide a input param");
      return false;
    }else{
      return true;
    }
  }
}
