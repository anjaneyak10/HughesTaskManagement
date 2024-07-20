import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap,map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8081/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response && response.token) {
          this.setToken(response.token);
          this.setUserRole(response.token.user.role);
          console.log('Token received:', response.token)
        }
      })
    );
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getallusers`, {}).pipe(
      tap(response => {
        console.log('Users received:', response);
      }),
      map(response => response)
      );
  }

  register(email: string, name: string, username: string, role: string, func: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { email, name, username, role, function: func, password }).pipe(
      tap(response => {
        if (response.message === 'User created successfully') {
          console.log('User registered successfully');
        }
      })
    );
  }

  setToken(token: string): void {
    console.log('Setting token:', token);
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUserRole(role: string): void {
    console.log('Setting user role:', role);  
    localStorage.setItem('userRole', role);
  }

  getUserRole(): string | null {
    const role = localStorage.getItem('userRole');
    console.log('Getting user role:', role);  
    return role;

  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  navigateBasedOnUserRole(): void {
    const userRole = this.getUserRole();
    console.log('User role:', userRole);
    switch(userRole) {
      case 'functionalLead':
        this.router.navigate(['functionalleaddashboard']);
        break;
      case 'employee':
        this.router.navigate(['employeedashboard']);
        break;
      case 'executive':
        this.router.navigate(['executivedashboard']);
        break;
      default:
        this.router.navigate(['login']);
    }
  }

}
