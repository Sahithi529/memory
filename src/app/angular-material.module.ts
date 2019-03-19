import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatProgressBarModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class AngularMaterialModule { }
