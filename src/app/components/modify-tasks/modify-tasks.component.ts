import { Component } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModifyTaskModalComponent } from '../modify-task-modal/modify-task-modal.component';
export interface Task {
  function_id: string;
  function_name: string;
  taskName: string;
  taskid: string;
  weightage: string;
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
constructor(private templateService: TemplateService,public dialog: MatDialog, private snackBar: MatSnackBar) { 
  this.spinner=true;
}
  ngOnInit() {
    this.getAlltasks();
  }
  getAlltasks() {
    this.spinner=true;
    this.templateService.getAllTasks().subscribe(
      response => {
      this.tasks = response.tasks;
      console.log('Tasks:', this.tasks);
      this.spinner=false;
      this.filteredTasks = this.tasks;
      },
      error => console.error('Error fetching tasks:', error)
    );
  }
  applyFilter() {
    if(this.searchTerm !== '') {
    this.filteredTasks = this.tasks.filter(task => task.taskName.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }
  onRowClick(row:any|null):void {
   console.log('Row clicked:', row);
   const dialogRef = this.dialog.open(ModifyTaskModalComponent, {
    width: 'auto', // Set your desired width
    height: 'auto', // Set your desired height
    data: { task: row },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result && result.taskModified) {
      this.showToast('Task created successfully!');
      this.getAlltasks();
    }
  });

  }
  showToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
