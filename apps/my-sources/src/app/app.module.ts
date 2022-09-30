import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { UptimeComponent } from '@jbhive_fe/uptime';
import { AuthModule } from '@jbhive_fe/auth';


import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

import { RouterModule, } from '@angular/router';
import { AppRoutingModule} from './app-routing.module'
import { FormBuilder, FormGroup } from '@angular/forms'
import { StoreDevtoolsModule} from '@ngrx/store-devtools'
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, UptimeComponent],
  imports: [
    BrowserModule, 
    ApolloModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]) // empty array => register all effects, inside any modules => nothing to do in app module :)
    
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.graphql_url,
          }),
        };
      },
      deps: [HttpLink],
    },
    FormBuilder
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
