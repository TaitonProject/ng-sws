import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { SwsPaginationModule } from '../../libs/sws-pagination/src/sws-pagination.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SwsInputModule } from '../../libs/sws-input/src/sws-input.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    SwsPaginationModule, 
    SwsInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 
