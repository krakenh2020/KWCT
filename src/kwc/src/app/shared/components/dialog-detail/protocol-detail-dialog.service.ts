import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NGXLogger } from "ngx-logger";
import { ProtocolDetailDialogComponent } from "./protocol-detail-dialog/protocol-detail-dialog.component";

@Injectable()
export class ProtocolDetailDialogService {
  private opened = false;

  constructor(
    private dialog: MatDialog,
    private logger: NGXLogger) { }

  openDialog(title: string, content: {}): void {
    this.logger.info('openDialog - ', title, content);
    if (!this.opened) {
      this.opened = true;
      const dialogRef = this.dialog.open(ProtocolDetailDialogComponent, {
        data: { title, content },
        height: '350',
        maxHeight: '100%',
        width: '540px',
        maxWidth: '100%',
        disableClose: true,
        hasBackdrop: true
      });

      dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
      });
    }
  }
}
function ProtoloDeatailDialogComponent(ProtoloDeatailDialogComponent: any, arg1: { data: { title: string; content: {}; }; maxHeight: string; width: string; maxWidth: string; disableClose: true; hasBackdrop: true; }) {
  throw new Error('Function not implemented.');
}

