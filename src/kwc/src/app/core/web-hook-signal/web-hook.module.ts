import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WebHookSignalComponent } from "./web-hook-component/web-hook-signal.component";
import { WebHookRoutingModule } from "./web-hook-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";

import { MaterialModule } from "src/app/material.module";
import { SharedModule } from "src/app/shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";

import { RxReactiveDynamicFormsModule } from "@rxweb/reactive-dynamic-forms";

import { WebHookDialogComponent } from "./web-hook-dialog/web-hook-dialog.component";


@NgModule({
  declarations: [WebHookSignalComponent, WebHookDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveDynamicFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    WebHookRoutingModule,
    MaterialModule,
    MatNativeDateModule]
})
export class WebHookModule { }
