import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CommonModule } from '@angular/common';
@Component({
  selector: "web-hook-dialog",
  templateUrl: "./web-hook-dialog.component.html",
  styleUrls: ["./web-hook-dialog.component.scss"]
})
export class WebHookDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string }
  ) {}
}
