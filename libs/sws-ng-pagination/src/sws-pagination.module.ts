import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsPaginationComponent} from './sws-pagination.component';
import {RouterModule} from '@angular/router';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbPaginationModule.forRoot()
  ],
  declarations: [SwsPaginationComponent],
  exports: [SwsPaginationComponent],
})
export class SwsPaginationModule {
  public static forRoot(): ModuleWithProviders {

    return {
      ngModule: SwsPaginationModule,
    };
  }
}
