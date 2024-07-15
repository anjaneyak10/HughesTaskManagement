import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { forkJoin } from 'rxjs';

interface Task {
  name: string;
  organization: string;
  assignee: string;
  specialInstructions: string;
  exceptions: string;
}

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent {
  openTasks: any[] = [];
  closedTasks: any[] = [];
  displayedColumns: string[] = ['taskName', 'projectId', 'assignee', 'specialInstructions', 'exceptions'];
  spinner = true;
  upcomingTasks: Task[] = [];
  completedTasks: Task[] = [];
  constructor(private taskService: TaskService) {
    let  email=localStorage.getItem('email');
    if(email){
    const openTasks$ = this.taskService.getOpenTasks(email);
    const closedTasks$ = this.taskService.getclosedTasks(email);
  
    forkJoin([openTasks$, closedTasks$]).subscribe({
      next: ([openTasksResponse, closedTasksResponse]) => {
        this.openTasks = openTasksResponse.open_tasks;
        for (let i of this.openTasks) {
          console.log(i);
          this.upcomingTasks.push({name: i[0], organization: i[1], assignee: i[3], specialInstructions: '', exceptions: ''});
        }
  
        this.closedTasks = closedTasksResponse.closed_tasks;
        for (let i of this.closedTasks) {
          this.completedTasks.push({name: i[0], organization: i[1], assignee: i[3], specialInstructions: '', exceptions: ''});
        }
      },
      complete: () => {
        this.spinner = false; // Hide spinner when both requests are completed
      }
    });
  }
  }
      
  }
 



