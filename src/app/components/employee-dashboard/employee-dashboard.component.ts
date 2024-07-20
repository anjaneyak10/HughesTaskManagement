import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { forkJoin } from 'rxjs';

interface Task {
  taskName: string;
  projectId: string;
  assignee: string;
  specialInstructions: string;
  exceptions: string;
  dueDate: string;
  completedDate: string;
}

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent {
  openTasks: any[] = [];
  closedTasks: any[] = [];
  displayedColumns: string[] = ['taskName', 'projectId', 'assignee', 'specialInstructions', 'exceptions','dueDate'];
  completeddisplayedColumns: string[] = ['taskName', 'projectId', 'assignee', 'specialInstructions', 'exceptions'];
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
          const date = new Date(i.duedate);
          const formattedDate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
          this.upcomingTasks.push({taskName: i.taskname, projectId: i.projectname, assignee: i.assigneeemail, specialInstructions: i.specialinstruction, exceptions: i.exception, dueDate: formattedDate, completedDate: i.completeddate});
        }
  
        this.closedTasks = closedTasksResponse.closed_tasks;
        for (let i of this.closedTasks) {
          this.completedTasks.push({taskName: i.taskname, projectId: i.projectname, assignee: i.assigneeemail, specialInstructions: i.specialinstruction, exceptions: i.exception, dueDate: i.duedate, completedDate: i.completeddate});
        }
      },
      complete: () => {
        this.spinner = false; // Hide spinner when both requests are completed
      }
    });
  }
  }
      
  }
 



