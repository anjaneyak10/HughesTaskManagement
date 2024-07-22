import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
export class EmployeeDashboardComponent implements OnInit {
  displayedColumns: string[] = ['taskName', 'projectId', 'assignee', 'specialInstructions', 'exceptions', 'dueDate'];
  completedDisplayedColumns: string[] = ['taskName', 'projectId', 'assignee', 'specialInstructions', 'exceptions', 'completedDate'];
  spinner: boolean = true;
  upcomingTasks = new MatTableDataSource<Task>([]);
  completedTasks = new MatTableDataSource<Task>([]);

  @ViewChild('upcomingPaginator') upcomingPaginator !: MatPaginator;
  @ViewChild('completedPaginator') completedPaginator!: MatPaginator;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      const openTasks$ = this.taskService.getOpenTasks(email);
      const closedTasks$ = this.taskService.getclosedTasks(email); // Corrected method name

      forkJoin([openTasks$, closedTasks$]).subscribe({
        next: ([openTasksResponse, closedTasksResponse]) => {
          this.upcomingTasks.data = this.processTasks(openTasksResponse.open_tasks);
          this.completedTasks.data = this.processTasks(closedTasksResponse.closed_tasks);
        },
        complete: () => {
          this.spinner = false; // Hide spinner when both requests are completed
        }
      });
    }
  }

  ngAfterViewInit(): void {
      this.upcomingTasks.paginator = this.upcomingPaginator;
      this.completedTasks.paginator = this.completedPaginator;
  }

  private processTasks(tasks: any[]): Task[] {
    return tasks.map(task => ({
      taskName: task.taskname,
      projectId: task.projectname,
      assignee: task.assigneeemail,
      specialInstructions: task.specialinstruction,
      exceptions: task.exception,
      dueDate: this.formatDate(task.duedate),
      completedDate: task.completeddate // Only for completed tasks
    }));
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
}