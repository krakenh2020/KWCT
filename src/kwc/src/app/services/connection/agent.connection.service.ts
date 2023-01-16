import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ErrorHandler } from '../error.handler';

@Injectable({
  providedIn: 'root'
})
export class AgentConnectionService {

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) { }

  /**
   * Get all connections
   * @returns connections result
   */
  getConnections(): Observable<any[]> {
    return this.http.get<any[]>('/connections')
      .pipe(
        switchMap((response: any) => of(response.results)),
        catchError(this.errorHandler.handleError<any[]>('getConnections', []))
      );
  }

  /**
   * Remove connection by id
   * @param connectionId 
   * @returns 
   */
  removeConnection(connectionId: string): Observable<any> {
    if (!connectionId) {
      console.error('Must provide a connection ID');
      return;
    }
    return this.http.post<any>(`/connections/${connectionId}/remove`, {})
      .pipe(
        switchMap(() => of(connectionId)),
        catchError(this.errorHandler.handleError<any>('removeConnection', null))
      );
  }

  /**
   * Create an invitation request
   * @returns 
   */
  createInvitation(): Observable<any> {
    return this.http.post<any>('/connections/create-invitation', {})
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any>('createInvitation', null))
      );
  }

  /**
   * Receive an invitation
   * @param invitation 
   * @returns 
   */
  receiveInvitation(invitation: any ): Observable<any> {

 //   invitation["label"] = label;
    console.log("-------------------------------------"+JSON.stringify(invitation, null, 4))
    return this.http.post<any>('/connections/receive-invitation', invitation)
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any>('receiveInvitation', null))
      );
  }

  /**
   * Accept an invitation
   * @param connectionId 
   * @returns 
   */
  acceptInvitation(connectionId: any): Observable<any> {
    return this.http.post<any>(`/connections/${connectionId}/accept-invitation`, {})
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any>('acceptInvitation', null))
      );
  }

  /**
   * Accept a connection request
   * @param connectionId 
   * @returns 
   */
  acceptRequest(connectionId: any): Observable<any> {
    return this.http.post<any>(`/connections/${connectionId}/accept-request`, {})
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any>('acceptRequest', null))
      );
  }

}
