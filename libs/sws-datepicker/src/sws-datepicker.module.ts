import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgDatepickerComponent } from './sws-datepicker.component';
import { SWSLabelDirectiveModule } from 'sws-label-directive';

@NgModule({
  declarations: [ NgDatepickerComponent ],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, SWSLabelDirectiveModule ],
  exports: [ NgDatepickerComponent ]
})
export class NgDatepickerModule { }
