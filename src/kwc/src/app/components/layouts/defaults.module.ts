import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultsComponent } from './defaults.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    DefaultsComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule
  ]
})
export class DefaultsModule { }
