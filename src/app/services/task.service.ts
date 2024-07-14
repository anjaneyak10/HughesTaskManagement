// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/dashboard'; // Adjust the URL/port as needed

  constructor(private http: HttpClient) { }

  

  getclosedTasks(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/closed_tasks?email=${email}`).pipe(
      tap(response => {
        if (response && response.token) {
          console.log('response:', response);
        }
      })
    );
  }
  getOpenTasks(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/open_tasks?email=${email}`).pipe(
      tap(response => {
        if (response && response.token) {
          console.log('response:', response);
        }
      })
    );

}
getProjectList(email: string): Observable<any> {
  return this.http.get<any>(`http://localhost:5000/project/get_my_projects?email=${email}`).pipe(
    tap(response => {
      if (response && response.token) {
        console.log('response:', response);
      }
    })
  );

}
getProjectInfo(project_id: string): Observable<any> {
  return this.http.get<any>(`http://localhost:5000/project/project_view?project_id=${project_id}`).pipe(
    tap(response => {
      if (response && response.token) {
        console.log('response:', response);
      }
    })
  );
}
}