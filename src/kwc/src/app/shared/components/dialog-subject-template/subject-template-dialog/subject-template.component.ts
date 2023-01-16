import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { NGXLogger } from "ngx-logger";
import { map } from "rxjs/operators";
import { SubjectTemplateService } from "src/app/services/subject-template/subject-template.service";
import { ui } from "../model/uiSchema";

@Component({
  selector: 'subject-template',
  styleUrls: ['./subject-template.component.scss'],
  templateUrl: './subject-template.component.html',
})
export class SubjectTemplateComponent {

  credentialSubjectSchema : any = {
    'properties': {}
  };
  credentialSubjectModel = {};
  templates = [];
  VC_schema_File_URL: string = ""

  constructor(
    public dialogRef: MatDialogRef<SubjectTemplateComponent>,
    private templateService: SubjectTemplateService,
    private logger: NGXLogger) {

    this.logger.info('constructor');
    this.templateService.getTemplates()
      .pipe(
        map((object: any) => {
          this.templates = object.schemas;
          this.logger.info('getTemplates: ', JSON.stringify(object));
        })
      ).subscribe();

  }

  onChange(event) {
    this.logger.info('onChange: ', event.value);
    this.VC_schema_File_URL = event.value;
    this.templateService.getSubjectSchema(event.value)
      .pipe(
        map((object: any) => {
          
          this.credentialSubjectSchema.credentialSubject = object.credentialSubject;
          this.credentialSubjectSchema.credentialSubject.buttons = ui.buttons;
          this.logger.info('getSubjectSchema: ', JSON.stringify(this.credentialSubjectSchema));
        })
      ).subscribe();
  }

  actions = {
    submit: (property) => {
      this.dialogRef.close({ vc_schema_url: this.VC_schema_File_URL, data: property.value });
    },
    exit: (property) => {
      this.dialogRef.close();
    },
  };
}