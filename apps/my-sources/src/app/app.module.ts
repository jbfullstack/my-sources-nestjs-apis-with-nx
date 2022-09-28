import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { counterReducer, MyCounterComponent } from '@jbhive_fe/counter';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, MyCounterComponent],
  imports: [
    BrowserModule, 
    HttpClientModule,
    StoreModule.forRoot({ count: counterReducer })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
