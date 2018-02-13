import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsTableComponent} from './sws-table.component';
import {HttpClientModule} from '@angular/common/http';
import {SwsPaginationModule} from 'sws-pagin';
import {SwsLoadingModule} from 'sws-loading';
// import {SwsPaginationModule} from '../../sws-pagination/src/sws-pagination.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SwsPaginationModule,
    SwsLoadingModule
  ],
  declarations: [SwsTableComponent],
  exports: [SwsTableComponent],
  providers: []
})
export class SwsTableModule {
}
