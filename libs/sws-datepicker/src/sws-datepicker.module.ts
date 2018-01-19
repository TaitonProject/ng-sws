import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwsDatepickerComponent } from './sws-datepicker.component';
import { SwsLabelDirectiveModule } from 'sws-label-directive';

@NgModule({
  declarations: [ SwsDatepickerComponent ],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, SwsLabelDirectiveModule ],
  exports: [ SwsDatepickerComponent ]
})
export class SwsDatepickerModule { }
