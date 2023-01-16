import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ErrorHandler } from '../error.handler';

import config from '../../../config/server-configuration.json';

@Injectable({
  providedIn: 'root'
})
export class SubjectTemplateService {

  vc_schema_index_file_url: string;

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) { 

    this.vc_schema_index_file_url = $ENV.VC_SCHEMA_INDEX_FILE_URL !== undefined ? $ENV.VC_SCHEMA_INDEX_FILE_URL : config.configurations.VC_SCHEMA_INDEX_FILE_URL;

  }

  /**
   * Get all connections
   * @returns connections result
   */
  getTemplates(): Observable<any[]> {
    console.log('getTemplates')
    //return this.http.get<any[]>('https://raw.githubusercontent.com/krakenh2020/vc-schemas/main/VCSchemaIndex.json')
    return this.http.get<any[]>(this.vc_schema_index_file_url)
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any[]>('getTemplates', []))
      );
  }

  /**
   * Get all connections
   * @returns connections result
   */
   getSubjectSchema(url:string): Observable<any[]> {
    console.log('getSubjectSchema' + url)
    return this.http.get<any[]>(url)
      .pipe(
        switchMap((response: any) => of(response)),
        catchError(this.errorHandler.handleError<any[]>('getSubjectSchema', []))
      );
  }
 

}
