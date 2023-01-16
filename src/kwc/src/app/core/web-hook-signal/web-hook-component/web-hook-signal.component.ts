import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { WebHookType } from 'src/app/models/web-hook/WebHookType';
import { KrakentWebControllerSocketIoService } from 'src/app/services/krakent-web-controller-socket-io.service';
import { WebHookService } from './web-hook.service';
import { CommonModule } from '@angular/common';
import { WebHookDialogComponent } from '../web-hook-dialog/web-hook-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-web-hook-signal',
  templateUrl: './web-hook-signal.component.html',
  styleUrls: ['./web-hook-signal.component.scss']
})
export class WebHookSignalComponent implements OnInit,AfterViewInit  {
  displayedColumns = ['rowNum', 'webHookType', 'requestBodyId', 'topic', 'message'];
  public webhooks: WebHookType[]
  dataSource: MatTableDataSource<WebHookType>;
  private opened = false;
  message: string;
  
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(public webHookService: WebHookService, public matDialog: MatDialog) {

  }

  ngOnInit(): void {
    console.log("web-hook received")
    this.webhooks = this.webHookService.webhooks
    this.dataSource = new MatTableDataSource(this.webhooks);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(message: string) {
    if (!this.opened) {
      this.opened = true;
      let msg=JSON.stringify(message)
      const dialogRef = this.matDialog.open(WebHookDialogComponent, {
        data: { message },
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
