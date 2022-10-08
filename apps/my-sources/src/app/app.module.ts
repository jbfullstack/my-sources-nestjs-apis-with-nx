import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms'

import { FlexLayoutModule } from "@angular/flex-layout";

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
import { AdminComponent, WaitingListComponent, ActivateUserComponent, AdminModule, ManageUserComponent, ActivatedListComponent } from '@jbhive/admin_fe';
import { ApolloInterceptor, GraphQLModule } from '@jbhive/graphql';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent, 
    NxWelcomeComponent, 
    UptimeComponent, 
    ProfileComponent, 
    AdminComponent, 
    WaitingListComponent, 
    ActivateUserComponent, 
    ManageUserComponent, 
    ActivatedListComponent
  ],
  imports: [
    BrowserModule, 
    ApolloModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
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
    MaterialsModules,
    FormBuilder,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApolloInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
