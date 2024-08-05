import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { ColDef } from 'ag-grid-community';
import { SlideToggleCellRendererComponent } from '../slide-toggle-cell-renderer/slide-toggle-cell-renderer.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { StatusDropdownRendererComponent } from '../status-dropdown-render/status-dropdown-render.component';
import { ICellRendererParams } from 'ag-grid-community';

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
    createdOn:string;
    createdBy:string;
    functionName:string;
    lastUpdatedBy:string;
    lastUpdatedOn:string;
  }],
  projectId: string
}

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  params!: ICellRendererParams;
  selectedTab: any;
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
    { headerName: 'Function Name', field: 'functionName', sortable: true, filter: true },
    {
      headerName: 'Status', field: 'completion', cellRenderer: StatusDropdownRendererComponent, cellRendererParams: {
        onChange: (params: any) => this.toggleStatus(params.data)
      }
    },
    { headerName: 'Due Date', field: 'dueDate', sortable: true, filter: true ,cellStyle: this.cellStyleFunction},
    { headerName: 'Special Instructions', field: 'specialInstructions', sortable: true, filter: true },
    { headerName: 'Exceptions', field: 'exceptions', sortable: true, filter: true },
    { headerName: 'Last Updated By', field: 'lastUpdatedBy', sortable: true, filter: true },
    { headerName: 'Last Updated On', field: 'lastUpdatedOn', sortable: true, filter: true },
    { headerName: 'Created By', field: 'createdBy', sortable: true, filter: true },
    { headerName: 'Created On', field: 'createdOn', sortable: true, filter: true },
  
    
  ];

  completedColumnDefs: ColDef[] = [
    { headerName: 'Task Name', field: 'taskName', sortable: true, filter: true },
    { headerName: 'Assignee', field: 'assignee', sortable: true, filter: true },
    { headerName: 'Function Name', field: 'functionName', sortable: true, filter: true },
    {
      headerName: 'Status', field: 'completion', cellRenderer: StatusDropdownRendererComponent, cellRendererParams: {
        onChange: (params: any) => params.data.completion = params.value
      }
    },
    { headerName: 'Special Instructions', field: 'specialInstructions', sortable: true, filter: true },
    { headerName: 'Exceptions', field: 'exceptions', sortable: true, filter: true },
    { headerName: 'Completed Date', field: 'completedDate', sortable: true, filter: true },
    { headerName: 'Last Updated By', field: 'lastUpdatedBy', sortable: true, filter: true },
    { headerName: 'Last Updated On', field: 'lastUpdatedOn', sortable: true, filter: true },
    { headerName: 'Created By', field: 'createdBy', sortable: true, filter: true },
    { headerName: 'Created On', field: 'createdOn', sortable: true, filter: true },
   
    
  ];
  constructor(private taskService: TaskService, private snackBar: MatSnackBar, private router: Router, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
      this.tabGroup = new MatTabGroup(this.elementRef, this.cdr);
    this.spinner = true;
    this.tab = {
      tasks: this.upcomingTasks,
      columnDefs: [],
      noTasksMessage: ''
    }
    const navigation = this.router.getCurrentNavigation();
    this.activeTabIndex = navigation && navigation.extras && navigation.extras.state ? navigation.extras.state['data'] : 0;
  }
  ngOnInit(): void {
    this.getData();
  }
  ngAfterViewInit(): void {
    this.selectTab(this.activeTabIndex);
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
          console.log(JSON.stringify(closedTasksResponse))
        });
      }
    }
  }

  private processTasks(tasks: any[]): Task[] {
    const taskMap: { [key: string]: Task } = {};

    tasks.forEach(task => {
      const taskData = {
        taskName: task.taskname,
        assignee: task.assigneeemail,
        specialInstructions: task.specialinstruction,
        exceptions: task.exception,
        dueDate: task.duedate?this.formatDate(task.duedate):'',
        completedDate: task.completed_date? this.formatDate(task.completed_date) : '',
        completion: task.completion,
        projecttaskid: task.projecttaskid,
        createdOn:task.createdon?this.formatDate(task.createdon):'',
        createdBy:task.createdby,
        functionName:task.functionname,
        lastUpdatedBy:task.lastupdatedby,
        lastUpdatedOn:task.lastupdatedon?this.formatDate(task.lastupdatedon):''
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
        if(this.activeTabIndex==0){
        this.showToast('Marked Task As Complete');
        }
        else{
          this.showToast('Marked Task As Incomplete');
        }
        this.getData();
      },
      error => {
        console.error('Error updating status', error);
      }
    );
  }
  showToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 0, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['toastStyle'],
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.spinner = true;
    this.activeTabIndex = event.index;
    this.getData();
  }
  selectTab(index: number): void {
    this.tabGroup.selectedIndex = index;
  }
  cellStyleFunction(params: any) {
    const today = new Date();
    const dueDate = new Date(params.value);
    if (dueDate < today) {
      return { color: 'red', fontWeight: 'bold' };
    }
    return null;
  }

  
  onDoneClick(project: any): void {
    const email = localStorage.getItem('email') || '';
  
    const dataToSend = project.data.map((task: any) => ({
      email: email,
      project_task_id: task.projecttaskid,
      status: this.stringToBoolean(localStorage.getItem(task.projecttaskid))
    }));
  
    console.log('Data to send:', dataToSend);
  
    this.taskService.changeTaskStatus(dataToSend).subscribe(
      response => {
        console.log('Status updated successfully:', response);
        this.showToast('Task statuses updated successfully for ' + project.projectId);
        this.getData();
      },
      error => {
        console.error('Error updating status:', error);
        this.showToast('Error updating task statuses for ' + project.projectId);
      }
    );
  }
  
  private stringToBoolean(value: string | null): boolean {
    return value === 'true';
  }
  
    
}