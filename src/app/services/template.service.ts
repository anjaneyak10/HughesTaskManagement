// template.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; 


@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private apiUrl = 'http://127.0.0.1:8081/project'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  createTemplate(data: { templateName: string; createdBy: string }): Observable<any> {
    console.log(data);
    return this.http.post(`${this.apiUrl}/addTemplate`, data);
  }

  getAllTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getalltasks`);
  }
  modifyTaskInMaster(task: any): Observable<any> {
    console.log('Task to modify service', task);
    const url = `${this.apiUrl}/modifytaskinmaster`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, task, { headers });
  }

  addTasksToTemplate(templateId: string, taskIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/addtasktotemplate`, { templateId: templateId, taskId: taskIds });
  }
}