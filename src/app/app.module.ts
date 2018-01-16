import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { SwsPaginationModule } from '../../libs/sws-pagination/src/sws-pagination.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SwsInputModule } from '../../libs/sws-input/src/sws-input.module';
import { SwsFormFieldErrorsModule } from '../../libs/sws-form-field-errors/src/sws-form-field-errors.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SWSLabelDirectiveModule } from '../../libs/sws-label-directive/src/sws-label.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    SwsPaginationModule, 
    SwsInputModule,
    SwsFormFieldErrorsModule,
    FormsModule,
    ReactiveFormsModule,
    SWSLabelDirectiveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
