import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SwsPaginationModule} from '../../libs/sws-pagination/src/sws-pagination.module';
import {AppRoutingModule} from './app-routing.module';
import {SwsInputModule} from '../../libs/sws-input/src/sws-input.module';
import {SwsFormFieldErrorsModule} from '../../libs/sws-form-field-errors/src/sws-form-field-errors.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {SWSHintModule} from '../../libs/sws-hint/src/sws-hint.module';
import {SwsDatepickerModule} from '../../libs/sws-datepicker/src/sws-datepicker.module';
import {AppService} from './app.service';
import {SwsLoadingModule} from 'sws-loading';
import {SwsTableModule} from 'sws-table';
import {SwsAccordionModule} from 'sws-accordion';
import {SwsTabsModule} from '../../libs/sws-tabs/src/sws-tabs.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SwsPaginationModule,
    SwsInputModule,
    SwsFormFieldErrorsModule,
    FormsModule,
    ReactiveFormsModule,
    SWSHintModule,
    SwsDatepickerModule,
    SwsTableModule,
    SwsLoadingModule,
    SwsAccordionModule,
    SwsTabsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
