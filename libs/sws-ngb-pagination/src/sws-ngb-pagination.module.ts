import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsNgbPaginationComponent} from './sws-ngb-pagination.component';
import {RouterModule} from '@angular/router';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbPaginationModule.forRoot()
  ],
  declarations: [SwsNgbPaginationComponent],
  exports: [SwsNgbPaginationComponent],
})
export class SwsNgbPaginationModule {
  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: SwsNgbPaginationModule,
    };
  }
}
