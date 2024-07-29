import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Task {
  data:[{taskName: string;
    assignee: string;
    specialInstructions: string;
    exceptions: string;
    dueDate: string;
    completedDate: string;
    completion: boolean;
    projecttaskid: string;}],
    projectId:string
}

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  displayedColumns: string[] = ['taskName', 'assignee', 'specialInstructions', 'exceptions', 'dueDate'];
  completedDisplayedColumns: string[] = ['taskName', 'assignee', 'specialInstructions', 'exceptions', 'completedDate'];
  spinner: boolean = true;
  upcomingTasks = new MatTableDataSource<Task>([]);
  completedTasks = new MatTableDataSource<Task>([]);

  @ViewChild('upcomingPaginator') upcomingPaginator !: MatPaginator;
  @ViewChild('completedPaginator') completedPaginator!: MatPaginator;

  constructor(private taskService: TaskService,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    const email = localStorage.getItem('email');
    if (email) {
      const openTasks$ = this.taskService.getOpenTasks(email);
      const closedTasks$ = this.taskService.getclosedTasks(email); // Corrected method name

      forkJoin([openTasks$, closedTasks$]).subscribe({
        next: ([openTasksResponse, closedTasksResponse]) => {
          this.upcomingTasks.data = this.processTasks(openTasksResponse.open_tasks);
          this.completedTasks.data = this.processTasks(closedTasksResponse.closed_tasks);
          console.log('Open tasks:', JSON.stringify(this.upcomingTasks.data));
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
    const taskMap: { [key: string]: Task } = {};
  
    tasks.forEach(task => {
      const formattedDate = this.formatDate(task.duedate);
      const taskData = {
        taskName: task.taskname,
        assignee: task.assigneeemail,
        specialInstructions: task.specialinstruction,
        exceptions: task.exception,
        dueDate: formattedDate,
        completedDate: task.completed_date ? this.formatDate(task.completed_date) : '',
        completion: task.completion,
        projecttaskid: task.projecttaskid,
      };
      if (!taskMap[task.projectname]) {
        taskMap[task.projectname] = { data: [taskData], projectId: task.projectname };
      }
      taskMap[task.projectname].data.push(taskData);
    });
  
    return Object.values(taskMap);
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
    this.spinner = true;
    const taskData = { email: localStorage.getItem('email'), project_task_id: task.projecttaskid, status: newStatus };
    this.taskService.changeTaskStatus(taskData).subscribe(
      response => {
        this.getData();
      },
      error => {
        console.error('Error updating status', error);
      }
    );
  }
}