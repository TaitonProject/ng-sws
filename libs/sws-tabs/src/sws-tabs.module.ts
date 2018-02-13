import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsTabComponent} from './tab/sws-tab.component';
import {SwsTabsComponent} from './sws-tabs.component';
import {SwsLoadingModule} from '../../sws-loading/src/sws-loading.module';
// import {SwsLoadingModule} from 'sws-loading';

@NgModule({
  imports: [
    CommonModule,
    SwsLoadingModule
  ],
  exports: [SwsTabComponent, SwsTabsComponent],
  declarations: [SwsTabComponent, SwsTabsComponent]
})
export class SwsTabsModule {
}
