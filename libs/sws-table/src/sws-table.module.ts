import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsTableComponent} from './sws-table.component';
import {HttpClientModule} from '@angular/common/http';
import {SwsLoadingModule} from 'sws-loading';
import {SwsPaginationModule} from 'sws-ngb-paginator';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SwsLoadingModule,
    SwsPaginationModule
  ],
  declarations: [SwsTableComponent],
  exports: [SwsTableComponent],
  providers: []
})
export class SwsTableModule {
}
