import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Injectable()
export class SubjectTemplateDialogService {
  private opened = false;

  constructor(private dialog: MatDialog) {}

  openDialog(title: string, content: {}): void {
    if (!this.opened) {
      this.opened = true;
      const dialogRef = this.dialog.open(SubjectTemplateDialogService, {
        data: { title, content },
        height: "350",
        maxHeight: "100%",
        width: "540px",
        maxWidth: "100%",
        disableClose: true,
        hasBackdrop: true
      });

      dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
      });
    }
  }
}


