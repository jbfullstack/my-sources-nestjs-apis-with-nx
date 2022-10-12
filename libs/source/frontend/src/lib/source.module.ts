import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'


import { AuthGuard, } from '@jbhive/auth_fe';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SourceEffect } from './store/effects/source.effect';
import { reducers } from './store/reducers/source.reducers';
import { SourceService } from './services/source.service';
import { SourcePageComponent } from './components/source-page/source-page.component';
import { SourceStore } from './store/source.store';

const routes = [
  {
    path: 'source',
    component: SourcePageComponent,
    canActivate: [AuthGuard],
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('source', reducers),
    EffectsModule.forFeature([SourceEffect]),
  ],
  providers: [SourceService, SourceStore]
})
export class SourceModule {}
