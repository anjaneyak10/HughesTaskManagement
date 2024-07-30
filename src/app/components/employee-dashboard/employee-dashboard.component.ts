import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { SlideToggleCellRendererComponent } from '../slide-toggle-cell-renderer/slide-toggle-cell-renderer.component';

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
  upcomingColumnDefs: ColDef[] = [
      { headerName: 'Task Name', field: 'taskName', sortable: true, filter: true },
      { headerName: 'Assignee', field: 'assignee', sortable: true, filter: true },
      { headerName: 'Special Instructions', field: 'specialInstructions', sortable: true, filter: true },
      { headerName: 'Exceptions', field: 'exceptions', sortable: true, filter: true },
      { headerName: 'Due Date', field: 'dueDate', sortable: true, filter: true },
      {
        headerName: 'Status', field: 'completion', cellRenderer: SlideToggleCellRendererComponent, cellRendererParams: {
          onChange: (params:any) => this.toggleStatus(params.data)
        }
      }
  ];
  
  completedColumnDefs: ColDef[] = [
      { headerName: 'Task Name', field: 'taskName', sortable: true, filter: true },
      { headerName: 'Assignee', field: 'assignee', sortable: true, filter: true },
      { headerName: 'Special Instructions', field: 'specialInstructions', sortable: true, filter: true },
      { headerName: 'Exceptions', field: 'exceptions', sortable: true, filter: true },
      { headerName: 'Completed Date', field: 'completedDate', sortable: true, filter: true },
      {
        headerName: 'Status', field: 'completion', cellRenderer: SlideToggleCellRendererComponent, cellRendererParams: {
          onChange: (params:any) => this.toggleStatus(params.data)
         }
      }
  ];
  
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
          console.log('Open tasks:', JSON.stringify(closedTasksResponse.closed_tasks));
          this.completedTasks.data = this.processTasks(closedTasksResponse.closed_tasks);
        },
        complete: () => {
          this.spinner = false; // Hide spinner when both requests are completed
        }
      });
    }
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
      else{
      taskMap[task.projectname].data.push(taskData);
      }
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
    console.log('Task:', task);
    this.spinner = true;
    const taskData = { email: localStorage.getItem('email'), project_task_id: task.projecttaskid, status: task.completion };
    console.log(JSON.stringify(taskData));
    this.taskService.changeTaskStatus(taskData).subscribe(
      response => {
        console.log('Status updated successfully', response);
        this.getData();
      },
      error => {
        console.error('Error updating status', error);
      }
    );
  }
}