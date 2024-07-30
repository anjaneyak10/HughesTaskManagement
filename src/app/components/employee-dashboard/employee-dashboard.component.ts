import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { ColDef } from 'ag-grid-community';
import { SlideToggleCellRendererComponent } from '../slide-toggle-cell-renderer/slide-toggle-cell-renderer.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

interface Task {
  data: [{
    taskName: string;
    assignee: string;
    specialInstructions: string;
    exceptions: string;
    dueDate: string;
    completedDate: string;
    completion: boolean;
    projecttaskid: string;
  }],
  projectId: string
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
  tab: { tasks: MatTableDataSource<Task>; columnDefs: ColDef[]; noTasksMessage: string; };
  activeTabIndex: number = 0; // Track the active tab index
  tabLabel = ['Upcoming', 'Completed'];
  upcomingColumnDefs: ColDef[] = [
    { headerName: 'Task Name', field: 'taskName', sortable: true, filter: true },
    { headerName: 'Assignee', field: 'assignee', sortable: true, filter: true },
    { headerName: 'Special Instructions', field: 'specialInstructions', sortable: true, filter: true },
    { headerName: 'Exceptions', field: 'exceptions', sortable: true, filter: true },
    { headerName: 'Due Date', field: 'dueDate', sortable: true, filter: true },
    {
      headerName: 'Status', field: 'completion', cellRenderer: SlideToggleCellRendererComponent, cellRendererParams: {
        onChange: (params: any) => this.toggleStatus(params.data)
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
        onChange: (params: any) => this.toggleStatus(params.data)
      }
    }
  ];
  constructor(private taskService: TaskService) {
    this.spinner = true;
    this.tab = {
      tasks: this.upcomingTasks,
      columnDefs: [],
      noTasksMessage: ''
    }
  }
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.spinner = true;
    const email = localStorage.getItem('email');
    let tabIndex = this.activeTabIndex;
    if (email) {
      if (tabIndex === 0) {
        this.taskService.getOpenTasks(email).subscribe(openTasksResponse => {
          this.upcomingTasks.data = this.processTasks(openTasksResponse.open_tasks);
          this.tab = {
            tasks: this.upcomingTasks,
            columnDefs: this.upcomingColumnDefs,
            noTasksMessage: 'No Upcoming Tasks'
          }
          this.spinner = false;
        });
      } else if (tabIndex === 1) {
        this.taskService.getclosedTasks(email).subscribe(closedTasksResponse => {
          this.completedTasks.data = this.processTasks(closedTasksResponse.closed_tasks);
          this.tab = {
            tasks: this.completedTasks,
            columnDefs: this.completedColumnDefs,
            noTasksMessage: 'No Completed Tasks'
          }
          this.spinner = false;
        });
      }
    }
  }

  private processTasks(tasks: any[]): Task[] {
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
      } else {
        taskMap[task.projectname].data.push(taskData);
      }
    });

    return Object.values(taskMap);
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  toggleStatus(task: any): void {
    this.spinner = true;
    const taskData = { email: localStorage.getItem('email'), project_task_id: task.projecttaskid, status: task.completion };
    this.taskService.changeTaskStatus(taskData).subscribe(
      response => {
        this.getData();
      },
      error => {
        console.error('Error updating status', error);
      }
    );
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.spinner = true;
    console.log('Tab changed:', event.index);
    this.activeTabIndex = event.index;
    this.getData();
  }
}