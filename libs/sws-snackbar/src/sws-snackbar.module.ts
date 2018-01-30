import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwsSnackbarComponent } from './sws-snackbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [SwsSnackbarComponent],
  declarations: [SwsSnackbarComponent]
})
export class SwsSnackbarModule { }
