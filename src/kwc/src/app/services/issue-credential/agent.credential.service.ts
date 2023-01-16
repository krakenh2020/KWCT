import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { ErrorHandler } from "../error.handler";

/**
 * Api for Aries RFC 0453: Issue Credential Protocol 2.0
 * The Issue Credential protocol consists of these messages:
 * - propose-credential - potential Holder to Issuer (optional). Tells what the Holder hopes to receive.
 * - offer-credential - Issuer to potential Holder (optional for some credential implementations; required for Hyperledger Indy). Tells what the Issuer intends to issue, and possibly, the price the Issuer expects to be paid.
 * - request-credential - potential Holder to Issuer. If neither of the previous message types is used, this is the message that begins the protocol.
 * - issue-credential - Issuer to new Holder. Attachment payload contains the actual credential.
 */
@Injectable({ providedIn: "root", })
export class AgentCredentialService {
  
  constructor(private http: HttpClient,private  errorHandler: ErrorHandler) { }

  /* -----------------------------------OFFER CREDENTIAL-----------------------------------*/
  /**
   * Send an offer
   * Needs a did connection estabilished
   * @param offer a json with both involved agents's did plus credential
   *
   * @returns piid
   */
  postSendOffer(offer: String): Observable<any> {
    console.log('postSendOffer input:{}', offer);
    return this.http.post<any>('/issuecredential/send-offer', offer).pipe(
      switchMap((response: any) => of(response)),
      catchError(this.errorHandler.handleError<any>('postSendOffer', null))
    );
  }

  /**
   * Decline an offer
   * 
   * @param piid 
   * @param reason 
   * @returns 
   */
  postDeclineOffer(piid: String, reason: String): Observable<any> {
    if (!piid) {
      console.error('Must provide a piid');
      return;
    }
    console.log('postDeclineOffer piid:{}, reason:{}', piid, reason);
    return this.http.post<any>(`/issuecredential/${piid}/decline-offer`, reason)
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any>('postDeclineOffer', null))
      );
  }

  /* -----------------------------------Accept OFFER CREDENTIAL-----------------------------------*/
  /**
   * Accept an offer
   * To accept a request you need to know PIID.
   *
   * @param piid the response of getAction call
   * @returns empty json
   */
  postAcceptOffer(piid: string, comment: string): Observable<any> {
    if (!piid) {
      console.error("Must provide a piid");
      return;
    }
    console.log('postAcceptOffer input:{}', piid);
    return this.http.post<any>(`/issuecredential/${piid}/accept-offer`, {})
      .pipe(
        switchMap((response: any) => of(response.results)),
        catchError(this.errorHandler.handleError<any>('postAcceptOffer', null))
      );
  }

  postSendRequest( request: string): Observable<any> {
   
    console.log('postSendRequest input: ', request);
    return this.http.post<any>(`/issuecredential/send-request`, request)
      .pipe(
        switchMap((response: any) => of(response.results)),
        catchError(this.errorHandler.handleError<any>('postSendRequest', null))
      );
  }

  /* -----------------------------------ACCEPT REQUEST-----------------------------------*/
  /**
   * Accept a request
   * To accept a request you need to know PIID.
   * @param piid
   * @param stringJsonAcceptRequest the credentials~attach
   * @returns empty json
   */
  postAcceptRequest(piid: String, stringJsonAcceptRequest: string): Observable<any> {
    if (!piid) {
      console.error('Must provide a piid');
      return;
    }
    console.log('postAcceptOffer piid:{}, stringJsonAcceptRequest:{}', piid, stringJsonAcceptRequest);
    return this.http.post<any>(`/issuecredential/${piid}/accept-request`, stringJsonAcceptRequest)
      .pipe(
        switchMap((response: any) => of(response.results)),
        catchError(this.errorHandler.handleError<any>('postAcceptRequest', null))
      );
  }

  /**
   * Decline a request
   * 
   * @param piid 
   * @param reason 
   * @returns 
   */
  postDeclineRequest(piid: string, reason: string): Observable<any> {
    if (!piid) {
      console.error('Must provide a piid');
      return;
    }
    console.log('postDeclineRequest piid:{}, reason:{}', piid, reason);
    return this.http.post<any>(`/issuecredential/${piid}/decline-request`, reason)
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any>('postDeclineRequest', null))
      );
  }

  /* -----------------------------------ACCEPT CREDENTIAL-----------------------------------*/

  /**
   * Accept a credential
   * To accept a credential you need to know PIID.
   * @param piid
   * @param stringJsonAcceptCredential a Json with credential name
   * @returns empty json
   */
  postAcceptCredential(piid: String, stringJsonAcceptCredential: String): Observable<any> {
    if (!piid) {
      console.error('Must provide a piid');
      return;
    }
    console.log('postAcceptOffer piid:{}, stringJsonAcceptCredential:{}', piid, stringJsonAcceptCredential);
    return this.http.post<any>(`/issuecredential/${piid}/accept-credential`, stringJsonAcceptCredential)
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any>('postAcceptCredential', null))
      );
  }


  ///////////////////////////////-----Decline api call-----////////////////////////////////////////////
  /**
   * Decline a proposal
   * 
   * @param piid 
   * @param reason 
   * @returns 
   */
  postDeclineProposal(piid: String, reason: String): Observable<any> {
    if (!piid) {
      console.error('Must provide a piid');
      return;
    }
    console.log('postDeclineProposal piid:{}, reason:{}', piid, reason);
    return this.http.post<any>(`/issuecredential/${piid}/decline-proposal`, reason)
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any>('postDeclineProposal', null))
      );
  }

  /**
   * Decline a credential
   * 
   * @param piid 
   * @param reason 
   * @returns 
   */
  postDeclineCredential(piid: string, reason: string): Observable<any> {
    if (!piid) {
      console.error('Must provide a piid');
      return;
    }
    console.log('postDeclineCredential piid:{}, reason:{}', piid, reason);
    return this.http.post<any>(`/issuecredential/${piid}/decline-credential`, reason)
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any>('postDeclineCredential', null))
      );
  }

  /**
   * Remove a credential
   * 
   * @param piid 
   * @param reason 
   * @returns 
   */
  postRemoveCredential(vcName: String): Observable<any> {
    if (!vcName) {
      console.error('Must provide a piid');
      return;
    }
    console.log('postRemoveCredential piid:{}, reason:{}', vcName);
    return this.http.post<any>(`/verifiable/credential/remove/name/${vcName}`, {})
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any>('postRemoveCredential', null))
      );
  }

  /**
     * Get a Credential by id
     *
     * @returns piid
     */
  getCredentialById(id: string): Observable<any> {
    return this.http.get<any>(`/verifiable/credential/${id}`, {})
      .pipe(
        switchMap((verifiableCredential: any) => of(verifiableCredential)),
        catchError(this.errorHandler.handleError<any>('getCredentialById', null)));
  }

  getCredentials(): Observable<any[]> {
    return this.http.get<any[]>('/verifiable/credentials')
      .pipe(
        switchMap((response: any) => of(response.result)),
        catchError(this.errorHandler.handleError<any[]>('getCredentials', []))
      );
  }
  ///////////////////////////////////////////////////////////////////////////
  /**
   * Get a Piid
   *
   * @returns piid
   */
  getPiid(): Observable<any> {
    return this.http.get<any>(`/issuecredential/actions`, {})
      .pipe(
        switchMap((response: any) => of(response.actions)),
        catchError(this.errorHandler.handleError<any>('getPiid', null)));
  }


  postVerifiableCredential(signrequest: String): Observable<any> {
    return this.http.post<any>('/verifiable/signcredential', signrequest).pipe(
      switchMap((response: any) => of(response)),
      catchError(this.errorHandler.handleError<any>('postSendOffer', null))
    );
  }

}
