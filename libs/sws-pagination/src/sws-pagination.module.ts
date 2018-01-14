import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwsPaginationComponent} from './sws-pagination.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [SwsPaginationComponent],
    exports: [SwsPaginationComponent]
})
export class SwsPaginationModule {
}
