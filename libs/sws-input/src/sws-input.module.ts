import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsInputComponent} from './sws-input.component';
import {FormsModule} from '@angular/forms';
import { SWSLabelDirectiveModule } from '../../sws-label-directive/src/sws-label.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SWSLabelDirectiveModule
  ],
  declarations: [SwsInputComponent],
  exports: [SwsInputComponent]
})
export class SwsInputModule {
}
