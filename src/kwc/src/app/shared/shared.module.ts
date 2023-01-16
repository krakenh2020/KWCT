import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { EmptyListComponent } from './components/empty-list/empty-list.component';

import { ToDatePipe } from './pipes/to-date.pipe';
import { ConnectionCardComponent } from './components/connection-card/connection-card.component';
import { ErrorDialogService } from '../services/errors/error-dialog.service';
import { MaterialModule } from '../material.module';
import { ErrorDialogComponent } from './components/dialog-error/error-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalErrorHandler } from '../services/errors/global-error-handler';
import { HttpErrorInterceptor } from '../services/errors/http-error.interceptor';
import { ConnectionCardListComponent } from './components/connection-card-list/connection-card-list.component';
import { SubjectTemplateComponent } from './components/dialog-subject-template/subject-template-dialog/subject-template.component';
import { CommentDialogComponent } from './components/dialog-comment/comment-dialog/comment-dialog.component';
import { ProtocolDetailDialogService } from './components/dialog-detail/protocol-detail-dialog.service';
import { ProtocolDetailDialogComponent } from './components/dialog-detail/protocol-detail-dialog/protocol-detail-dialog.component';
import { DefaultWidgetRegistry, SchemaFormModule, WidgetRegistry } from 'ngx-schema-form';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    SubjectTemplateComponent,
    ErrorDialogComponent,
    ProtocolDetailDialogComponent,
    CommentDialogComponent,
    EmptyListComponent,
    ToDatePipe,
    ConnectionCardComponent,
    ConnectionCardListComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    SchemaFormModule.forRoot()
    
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    // Components
    EmptyListComponent,
    ToDatePipe,
    MaterialModule,
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  providers: [
    ErrorDialogService,
    ProtocolDetailDialogService,
    { provide: WidgetRegistry, useClass: DefaultWidgetRegistry },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }]

})
export class SharedModule { }
