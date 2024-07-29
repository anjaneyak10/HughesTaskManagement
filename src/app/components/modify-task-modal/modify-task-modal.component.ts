import { Component,Input,Inject, Optional } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-modify-task-modal',
  templateUrl: './modify-task-modal.component.html',
  styleUrls: ['./modify-task-modal.component.css']
})
export class ModifyTaskModalComponent {
  @Input() task: any;
  spinner=false;
  functionNames: string[] = [
    'QTO',
    'Pilot',
    'Order Management',
    'Invoicing',
    'Program Team',
    'Support',
    'Score Card'
  ];
  constructor(private templateService: TemplateService,@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<ModifyTaskModalComponent>) { 
    
    this.task= {...data.task,is_obsolete:false}

    console.log('Task:', this.task);
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  modifyTask(task: any): void {
    this.spinner=true;
    console.log('Task to modify:', task);
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
