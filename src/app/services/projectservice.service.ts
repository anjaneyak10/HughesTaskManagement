import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,tap ,map} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectserviceService {

  private baseUrl = 'http://127.0.0.1:5000/project';

  constructor(private http: HttpClient, private router: Router) {}


  gettemplate(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getalltemplates`, {}).pipe(
      tap(response => {
        console.log('Template received:', response);
      }),
      map(response => response.templates)
    );
  }
  getFunctions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getallfunctions`, {}).pipe(
      tap(response => {
        console.log('Functions received:', response);
      }),
      map(response => response)
    );
  }
}
