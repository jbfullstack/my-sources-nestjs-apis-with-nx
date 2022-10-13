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

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule} from './app-routing.module'
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

import { UptimeComponent } from '@jbhive/uptime';
import { AuthModule } from '@jbhive/auth_fe';
import { SourceModule } from '@jbhive/source_fe';

import { MaterialsModules } from './material.modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent, ProfileModule } from '@jbhive/profile';
import { AdminComponent, WaitingListComponent, ActivateUserComponent, AdminModule, ManageUserComponent, ActivatedListComponent, TagListComponent, ManageTagrComponent } from '@jbhive/admin_fe';
import { ApolloInterceptor, GraphQLModule } from '@jbhive/graphql';
import { MathModule } from '@jbhive/math';
import { SnackBarComponent, SnackbarModule } from '@jbhive/snackbar';

import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SourcePageComponent, SourcesComponent, SourceComponent } from '@jbhive/source_fe';
import { HighlightDirective, HighlighterPipe } from '@jbhive/types_fe';




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
    ActivatedListComponent,
    SnackBarComponent,
    TagListComponent,
    ManageTagrComponent,
    SourcePageComponent,
    SourcesComponent,
    SourceComponent,
    HighlighterPipe,
    HighlightDirective
  ],
  imports: [
    BrowserModule, 
    ApolloModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule,
    // MyOwnMaterial modules there !!
    MaterialsModules,
    MatSnackBarModule,
    MatIconModule,
    AuthModule,
    AdminModule,
    ProfileModule,
    SourceModule,
    MathModule,
    SnackbarModule,
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
    },
    SnackBarComponent 
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTabsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
