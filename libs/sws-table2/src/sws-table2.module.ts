import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsTable2Component} from './sws-table2.component';
import {SwsPaginationModule} from 'sws-pagin';

@NgModule({
  imports: [
    CommonModule,
    SwsPaginationModule
  ],
  declarations: [SwsTable2Component],
  exports: [SwsTable2Component]
})
export class SwsTable2Module {
}
