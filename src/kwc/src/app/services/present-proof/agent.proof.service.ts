import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { ErrorHandler } from "../error.handler";


/**
 * Api for Aries RFC 0454: Present Proof Protocol 2.0
 * The Present Proof protocol consists of these messages:
 * - send-request-presentation - 
 * - accept-request-presentation - 
 * - accept-presentation - 
 */
@Injectable({ providedIn: "root", })
export class AgentProofService {
  
  constructor(private http: HttpClient,private  errorHandler: ErrorHandler) { }

  /**
   * Send a request presentation
   * Needs a did connection estabilished
   * @param requestPresentation a json with both involved agents's did plus credential
   *
   * @returns piid
   */
  postSendRequestPresentation(requestPresentation: String): Observable<any> {
    console.log('postSendRequestPresentation input:{}', requestPresentation);
    return this.http.post<any>('/presentproof/send-request-presentation', requestPresentation).pipe(
      switchMap((response: any) => of(response)),
      catchError(this.errorHandler.handleError<any>('postSendRequestPresentation', null))
    );
  }

  /**
   * 
   * @param presenterDID 
   * @param CredentialId 
   * @param signatureType 
   * @returns the presentation in json format ( si spera :-) )
   */
  postGeneratePresentationById( presenterDID: string, CredentialId: string, signatureType: string ): Observable<any>{

    let data = {
      "did": presenterDID,
      "id": CredentialId,
      "signatureType": signatureType
    }

    console.log('postGeneratePresentationById data: ' + JSON.stringify( data, null, 4));
    return this.http.post<any>('/verifiable/presentation/generatebyid', JSON.stringify(data))
      .pipe(
        switchMap((response: any) => of(response.results)),
        catchError(this.errorHandler.handleError<any>('postGeneratePresentationById', JSON.stringify( data, null, 4)))
      );
  }

  /**
   * Accept a request presentation
   * To accept a request you need to know PIID.
   * @param piid the response of a /presentproof/actions call
   * @returns empty json
   */
  postAcceptRequestPresentation(piid: String, presentation: String): Observable<any> {
    if (!piid) {
      console.error('Must provide a piid');
      return;
    }
    console.log('postAcceptRequestPresentation input:{}, presentation:{}', piid, presentation);
    return this.http.post<any>(`/presentproof/${piid}/accept-request-presentation`, presentation)
      .pipe(
        switchMap((response: any) => of(response.results)),
        catchError(this.errorHandler.handleError<any>('postAcceptRequestPresentation', presentation))
      );
  }

  postDeclineRequestPresentation(piid: string, reason: string): Observable<any> {
    console.log('postDeclineRequestPresentation input:{}', piid, reason);
    return this.http.post<any>(`/presentproof/${piid}/decline-request-presentation`, reason).pipe(
      switchMap((response: any) => of(response)),
      catchError(this.errorHandler.handleError<any>('postDeclineRequestPresentation', null))
    );
  }

  /**
   * Accept a presentation
   * To accept a presentation you need to know PIID.
   * @param piid
   * @param stringJsonAcceptRequest the credentials~attach
   * @returns empty json
   */
  postAcceptPresentation(piid: String, presentationName: String): Observable<any> {
    if (!piid) {
      console.error('Must provide a piid');
      return;
    }

    let presentations = {
      "names": [ presentationName ]
    }

    console.log('postAcceptPresentation piid:{}, presentationName:{}', piid, JSON.stringify(presentations, null, 4));
    return this.http.post<any>(`/presentproof/${piid}/accept-presentation`, JSON.stringify(presentations))
      .pipe(
        switchMap((response: any) => of(response.results)),
        catchError(this.errorHandler.handleError<any>('postAcceptPresentation', null))
      );
  }

  postDeclinePresentation(piid: string, reason: string): Observable<any> {
    console.log('postDeclinePresentation input:{}', piid, reason);
    return this.http.post<any>(`/presentproof/${piid}/decline-presentation`, reason).pipe(
      switchMap((response: any) => of(response)),
      catchError(this.errorHandler.handleError<any>('postDeclineRequestPresentation', null))
    );
  }

  /**
   * Check presentations saved.   
   * @returns the presentations saved
   */
  getPresentations(): Observable<any> {
    console.log('getPresentations');
    return this.http.get<any>(`/verifiable/presentations`, {})
      .pipe(
        switchMap((response: any) => of(response.result)),
        catchError(this.errorHandler.handleError<any>('getPresentations', null))
      );
  }

  /**
     * Remove a presentation by name.      
     */
  removePresentationByName(name: string): Observable<any> {
    console.log('removePresentationByName');
    return this.http.post<any>(`/verifiable/presentation/remove/name/${name}`, {})
      .pipe(
        switchMap((response: any) => of(response.result)),
        catchError(this.errorHandler.handleError<any>('removePresentationByName', null))
      );
  }

  /**
   * If you need to know PIID. You can achieve that by performing /presentproof/actions API call.
   *
   * @returns piid
   */
  getPresentProofActions(): Observable<any> {
    return this.http.get<any>(`/presentproof/actions`, {})
      .pipe(
        switchMap((response: any) => of(response.actions)),
        catchError(this.errorHandler.handleError<any>('getPresentProofActions', null)));
  }

  getProofs(): Observable<any[]> {
    return this.http.get<any[]>('/present-proof/records')
      .pipe(
        switchMap((response: any) => of(response.results)),
        catchError(this.errorHandler.handleError<any[]>('getProofs', []))
      );
  }

}
