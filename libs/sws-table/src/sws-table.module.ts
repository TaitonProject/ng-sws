import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsTableComponent} from './sws-table.component';
import {HttpClientModule} from '@angular/common/http';
import {SwsLoadingModule} from 'sws-loading';
import {SwsNgbPaginationModule} from 'sws-ngb-pagination';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SwsLoadingModule,
    SwsNgbPaginationModule
  ],
  declarations: [SwsTableComponent],
  exports: [SwsTableComponent],
  providers: []
})
export class SwsTableModule {
}
