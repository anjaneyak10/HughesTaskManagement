import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,tap ,map} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectserviceService {

  private baseUrl = 'http://127.0.0.1:8080/project';

  constructor(private http: HttpClient, private router: Router) {}


  gettemplate(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getalltemplates`, {}).pipe(
      tap(response => {
        console.log('Template received:', response);
      }),
      map(response => response.templates)
    );
  }
  getFunctions(templateId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/getfunctions`, {templateId}).pipe(
      tap(response => {
        console.log('Functions received:', response);
      }),
      map(response => response)
    );
  }

  createProject(projectName:string,projectTemplateId:string,createdByEmail:string,projectFunctionLeads:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveproject`, {projectName, projectTemplateId,createdByEmail,projectFunctionLeads}).pipe(
      tap(response => {
        console.log('Project created:', response);
      }),
      map(response => response)
    );
  }

  getAllFunctions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getallfunctions`, {}).pipe(
      tap(response => {
        console.log('Functions received:', response);
      }),
      map(response => response)
    );
  }

  createTaskinTaskMaster(taskName: string, functionId: number, weightage: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/createtaskinmaster`, {taskName, functionId, weightage}).pipe(
      tap(response => {
        console.log('Task created:', response);
      }),
      map(response => response)
    );
  }

  getModifyProjectInfo(projectId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getmodifyprojectinfo`,{ params: { projectid: projectId } });
  }

  modifyprojectLeads(projectId:string,projectFunctionLeads:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/modifyfunctionalleads`, {projectId,projectFunctionLeads}).pipe(
      tap(response => {
        console.log('Project modified:', response);
      }),
      map(response => response)
    );
  }
}
