import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsAccordionComponent} from './sws-accordion.component';
import {SwsAccordionGroupComponent} from './sws-accordion-group/sws-accordion-group.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SwsAccordionComponent, SwsAccordionGroupComponent],
  exports: [SwsAccordionComponent, SwsAccordionGroupComponent],
})
export class SwsAccordionModule {
}
