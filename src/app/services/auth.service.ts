import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'xyz'; // JJP - TODO

  constructor(private http: HttpClient) {}

  /***
   * backend integrate hone ke baad uncomment
   */

  // login(username: string, password: string): Observable<any> {
  //   return this.http.post<{token: string}>(`${this.apiUrl}/login`, { username, password })
  //     .pipe(
  //       tap(response => {
  //         if (response && response.token) {
  //           localStorage.setItem('token', response.token);
  //         }
  //       })
  //     );
  // }

  // logout() {
  //   localStorage.removeItem('token');
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  
  /***
   * backend integrate hone ke baad comment
   */

  login(username: string, password: string): Observable<any> {
    // Simulate API call
    return of({ token: 'fake-jwt-token' }).pipe(
      delay(1000), // Simulate network delay
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}