import { NgModule } from '@angular/core';
import { SwsLabelDirective } from './sws-label.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
  exports: [SwsLabelDirective],
  declarations: [SwsLabelDirective]
})
export class SwsLabelDirectiveModule { }