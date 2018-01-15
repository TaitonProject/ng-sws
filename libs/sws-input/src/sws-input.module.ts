import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsInputComponent} from './sws-input.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SwsInputComponent],
  exports: [SwsInputComponent]
})
export class SwsInputModule {
}
