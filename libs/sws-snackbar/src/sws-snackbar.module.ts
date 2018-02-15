import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwsSnackbarComponent } from './sws-snackbar.component';
import { SnackbarService } from './services/snackbar.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [SwsSnackbarComponent],
  declarations: [SwsSnackbarComponent],
  entryComponents: [SwsSnackbarComponent],
  providers: [SnackbarService]
})
export class SwsSnackbarModule { }
