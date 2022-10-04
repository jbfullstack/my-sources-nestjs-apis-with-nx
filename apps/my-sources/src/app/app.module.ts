import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms'

import { FlexLayoutModule } from "@angular/flex-layout";
// import {MatIconModule} from '@angular/material/icon'; 

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule} from '@ngrx/store-devtools'

import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

import { RouterModule, } from '@angular/router';

import { AppRoutingModule} from './app-routing.module'
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

import { UptimeComponent } from '@jbhive/uptime';
import { AuthModule } from '@jbhive/auth_fe';
import { MaterialsModules } from './material.modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent, ProfileModule } from '@jbhive/profile';
import { AdminComponent, AdminModule } from '@jbhive/admin_fe';
import { GraphQLModule } from '@jbhive/graphql';



@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, UptimeComponent, ProfileComponent, AdminComponent],
  imports: [
    BrowserModule, 
    ApolloModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule,
    // MyOwnMaterial modules there !!
    MaterialsModules,
    AuthModule,
    AdminModule,
    ProfileModule,
    GraphQLModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule // empty array => register all effects, inside any modules => nothing to do in app module :)    
  ],
  providers: [
    GraphQLModule,
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory: (httpLink: HttpLink) => {
    //     return {
    //       cache: new InMemoryCache(),
    //       // link: middleware.concat(environment.graphql_url)
    //       link: httpLink.create({
    //         uri: environment.graphql_url,
    //         // headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    //         headers: new HttpHeaders().set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGVJZCI6MCwiaWF0IjoxNjY0OTAyOTk1LCJleHAiOjE2NjQ5MDY1OTV9.tyHyUpLJNtC6eG3v3MHRsh6C1AH5S3LKk_a5NsqPvj8`)
    //       }),
    //     };
    //   },
    //   deps: [HttpLink],
    // },
    MaterialsModules,
    FormBuilder
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
