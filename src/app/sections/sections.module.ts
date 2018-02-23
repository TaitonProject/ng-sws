import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsComponent } from './sections.component';
import {SectionsRoutingModule} from './sections-routing.module';
import {SwsTabsModule} from '../../../libs/sws-tabs/src/sws-tabs.module';

@NgModule({
  imports: [
    CommonModule,
    SectionsRoutingModule,
    SwsTabsModule
  ],
  declarations: [SectionsComponent],
  exports: [SectionsComponent]
})
export class SectionsModule { }
