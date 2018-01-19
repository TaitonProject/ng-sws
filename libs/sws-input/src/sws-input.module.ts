import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwsInputComponent } from './sws-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SwsLabelDirectiveModule} from 'sws-label-directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwsLabelDirectiveModule,
    ReactiveFormsModule
  ],
  declarations: [SwsInputComponent],
  exports: [SwsInputComponent]
})
export class SwsInputModule {
}
