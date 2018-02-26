import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TestRoutingModule} from './test-routing.module';
import {TestComponent} from './test.component';
import {SwsTableModule} from '../../../libs/sws-table/src/sws-table.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {SwsTableModule} from 'sws-table';

@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    SwsTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TestComponent]
})
export class TestModule {
}
