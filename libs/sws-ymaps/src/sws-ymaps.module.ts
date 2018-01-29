import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsYmapsComponent} from './sws-ymaps.component';
import {SwsYmapsService} from './sws-ymaps.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SwsYmapsComponent],
  exports: [SwsYmapsComponent],
  providers: [SwsYmapsService]
})
export class SwsYmapsModule {
}
