import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  getHelloWorld(): Observable<string> {
    return this.http.get('/api/hello', {responseType: 'text'});
  }
}
