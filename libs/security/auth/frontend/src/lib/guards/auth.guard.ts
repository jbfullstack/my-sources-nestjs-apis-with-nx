

import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, filter, first, map } from 'rxjs/operators';
import { AuthStateInterface } from '@jbhive/types_fe'
import { isLoggedInSelector } from '../../index';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthStateInterface>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedInSelector),
      tap((loaded: any) => {
        if (!loaded) {
          // this.store.dispatch(new LoadOrdersRequested());
          this.router.navigate(['login']);
        }
      }),
      filter((loaded: any) => loaded),
      first()
    );
  }
}
