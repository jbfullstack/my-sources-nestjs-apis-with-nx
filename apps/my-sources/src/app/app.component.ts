import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@jbhive_ai/api-interfaces';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { isLoggedInSelector } from '@jbhive/auth_fe';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { logoutAction } from '@jbhive/auth_fe';

@Component({
  selector: 'my-sources-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  // hello$ = this.http.get<Message>('/api/getData');
  userLoggedSelector$!: Observable<boolean | null>

  constructor(
    private store: Store, 
    private router: Router, 
    ) {}

  ngOnInit(): void {
    this.initializeValues()
  }
  

  initializeValues(): void {
    this.userLoggedSelector$ = this.store.pipe(select(isLoggedInSelector))
  }

  logout() {
    this.store.dispatch(logoutAction())
    this.router.navigate(['login']);
  }

  isCurrentRoute(routeName: string) {
    return this.router.url === '/' + routeName;
  }

}
