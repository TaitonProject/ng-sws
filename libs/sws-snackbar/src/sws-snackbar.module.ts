import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwsSnackbarComponent } from './sws-snackbar.component';
import {MessagesComponent} from './messages/messages.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [SwsSnackbarComponent, MessagesComponent],
  declarations: [SwsSnackbarComponent, MessagesComponent]
})
export class SwsSnackbarModule { }
