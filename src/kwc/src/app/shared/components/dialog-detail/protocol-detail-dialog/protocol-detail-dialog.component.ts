import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-protocol-detail-dialog",
  templateUrl: "./protocol-detail-dialog.component.html",
  styleUrls: ["./protocol-detail-dialog.component.scss"]
})
export class ProtocolDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; content: {} }
  ) {}
}
