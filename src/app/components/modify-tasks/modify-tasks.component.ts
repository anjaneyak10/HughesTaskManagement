import { Component } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModifyTaskModalComponent } from '../modify-task-modal/modify-task-modal.component';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
export interface Task {
  function_id: string;
  function_name: string;
  taskName: string;
  taskid: string;
  weightage: number;
}
@Component({
  selector: 'app-modify-tasks',
  templateUrl: './modify-tasks.component.html',
  styleUrls: ['./modify-tasks.component.css']
})


export class ModifyTasksComponent {
  source: any[] = [];
  tasks: Task[]= [];
  spinner=false;
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  columnDefs: ColDef<Task>[] =[
    { headerName: 'Task Name', field: 'taskName', sortable: true, filter: true },
    { headerName: 'Function Name', field: 'function_name', sortable: true, filter: true },
    { headerName: 'Weightage', field: 'weightage', sortable: true, filter: true }
  ];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true
  };
constructor(private templateService: TemplateService,public dialog: MatDialog, private snackBar: MatSnackBar) { 
  this.spinner=true;
}
ngAfterViewInit() {
  // Ensure styles are loaded before initializing the grid
  setTimeout(() => {
    // Any additional initialization logic can go here
  }, 0);
}
  ngOnInit() {
    this.getAlltasks();
  }
  getAlltasks() {
    this.spinner=true;
    this.templateService.getAllTasks().subscribe(
      response => {
      this.tasks = response.tasks;
      console.log('Tasks:', JSON.stringify(this.tasks));
      this.filteredTasks = this.tasks;
      this.spinner=false;
      },
      error => console.error('Error fetching tasks:', error)
    );
  }
  onRowClick(row:any|null):void {
   console.log('Row clicked:', row);
   const dialogRef = this.dialog.open(ModifyTaskModalComponent, {
    width: '35%', // Set your desired width
    height: '43%', // Set your desired height
    data: { task: row.data },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result && result.taskModified) {
      this.showToast('Task Modified successfully!');
      this.getAlltasks();
    }
  });

  }
  showToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 0,// Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
