import { Component,Input,Inject, Optional } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
interface Task {
  functionId: string;
  function_name: string;
  taskName: string;
  taskId: string;
  weightage: number;
  isObsolete: boolean;
}
@Component({
  selector: 'app-modify-task-modal',
  templateUrl: './modify-task-modal.component.html',
  styleUrls: ['./modify-task-modal.component.css'],

})

export class ModifyTaskModalComponent {
  @Input() task: Task;
  spinner=false;
  functionNames: string[] = [
    'QTO',
    'Pilot',
    'Order Management',
    'Invoicing',
    'Program Team',
    'Support',
    'ScoreCard'
  ];
  constructor(private templateService: TemplateService,@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<ModifyTaskModalComponent>) { 
    this.task =  {
        functionId: data.task.function_id,
        function_name: data.task.function_name,
        taskName: data.task.taskName,
        taskId: data.task.taskid,
        weightage: data.task.weightage,
        isObsolete: false
      };
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  modifyTask(task: any): void {
    this.spinner=true;
    delete task.function_name;
    console.log('Task to modify:', JSON.stringify(task));

    this.templateService.modifyTaskInMaster(task).subscribe(
      response => {
        console.log('Task Modified Successfully', response);
        this.spinner=false;
        this.dialogRef.close({ taskModified: true});
      },
      error => {
        console.error('Error modifying task:', error);
      }
    );
  }

}
