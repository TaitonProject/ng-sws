import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SwsPaginationModule} from '../../libs/sws-pagination/src/sws-pagination.module';
import {AppRoutingModule} from './app-routing.module';
import {SwsInputModule} from '../../libs/sws-input/src/sws-input.module';
import {SwsFormFieldErrorsModule} from '../../libs/sws-form-field-errors/src/sws-form-field-errors.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {SWSHintModule} from '../../libs/sws-hint/src/sws-hint.module';
import {SwsDatepickerModule} from '../../libs/sws-datepicker/src/sws-datepicker.module';
import {SwsTableModule} from '../../libs/sws-table/src/sws-table.module';
import {AppService} from "./app.service";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwsPaginationModule,
    SwsInputModule,
    SwsFormFieldErrorsModule,
    FormsModule,
    ReactiveFormsModule,
    SWSHintModule,
    SwsDatepickerModule,
    SwsTableModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
