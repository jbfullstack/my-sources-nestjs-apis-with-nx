import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@my-sources-nx/api-interfaces';

@Component({
  selector: 'my-sources-nx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/getData');
  constructor(private http: HttpClient) {}
}
