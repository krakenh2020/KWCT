import { Injectable, OnInit } from '@angular/core';
import {SubjectTemplateService} from '../subject-template/subject-template.service'
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UiSyncronizerService implements OnInit {

  // used to indicate the active view ( connectiion, presentation, credentials..) 
  public activeItem: string
  private kwctDefinedSchemaList: any | undefined

  constructor( 
    private subjectTemplateService: SubjectTemplateService 
    ) { }
  ngOnInit(): void {
    
    this.activeItem = '';
    this.subjectTemplateService.getTemplates().pipe(
      map((object: any) => {
        this.kwctDefinedSchemaList = object.schemas;
    })
    ).subscribe();
  }

  public get kwctSchemaList(){

       if ( this.kwctDefinedSchemaList === undefined ){
       
        this.subjectTemplateService.getTemplates().pipe(
          map((object: any) => {
            this.kwctDefinedSchemaList = object.schemas;
            return this.kwctDefinedSchemaList;
        })
        ).subscribe();
        
      } else{

        return this.kwctDefinedSchemaList;
       }

  }


}
