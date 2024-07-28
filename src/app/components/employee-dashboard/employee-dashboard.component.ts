import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CreateTaskModalComponent } from 'src/app/components/create-task-modal/create-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Task {
  taskName: string;
  projectId: string;
  assignee: string;
  specialInstructions: string;
  exceptions: string;
  dueDate: string;
  completedDate: string;
  completion: boolean;
  projecttaskid: string;
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

  constructor(private taskService: TaskService,public dialog: MatDialog, private snackBar: MatSnackBar) {
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

          console.log('Open tasks:', openTasksResponse);
          console.log('Closed tasks:', closedTasksResponse);

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
    console.log(JSON.stringify(tasks));
    return tasks.map(task => ({
      taskName: task.taskname,
      taskId: task.taskid,
      projectId: task.projectname,
      assignee: task.assigneeemail,
      specialInstructions: task.specialinstruction,
      exceptions: task.exception,
      dueDate: this.formatDate(task.duedate),
      completedDate: task.completeddate, 
      completion: task.completion,
      projecttaskid:task.projecttaskid 
    }));
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
  onRowClick(row:any ){
    console.log('Row clicked:', row);
  }
 
  toggleStatus(task: any): void {
    const newStatus = task.completion? false : true;
    console.log(JSON.stringify(task));
    const taskData = { email: localStorage.getItem('email'), project_task_id: task.projecttaskid, status: newStatus };
    console.log(taskData)
    this.taskService.changeTaskStatus(taskData).subscribe(
      response => {
        console.log('Status updated successfully:', response);
        location.reload();
      },
      error => {
        console.error('Error updating status', error);
      }
    );
  }
}