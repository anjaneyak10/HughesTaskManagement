import { Component, Inject, Optional } from '@angular/core'; // Add optional import statement
import { TaskService } from 'src/app/services/task.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css'],

})

export class CreateTaskModalComponent {
  assignees=[{name:'',email:''}];
  functions=[{functionname:'',functionid:''}];
  selectedAssignee: any;
  selectedFunction: any;
  spinner = true;
  selectedProjectId: any;
  readonly minDate = new Date();
  constructor(private taskService: TaskService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<CreateTaskModalComponent>,) {
    this.selectedProjectId=data.selectedProjectId
  }
  
  ngOnInit() {
    console.log(this.selectedProjectId);
    this.taskService.getCreateTaskInfo(this.selectedProjectId).subscribe((resp) => {
      console.log(JSON.stringify(resp));
      this.assignees = resp.assignees;
      this.functions = resp.functions;
      this.spinner = false;
      });
  }
  createTask(form: NgForm):void{
    if (form.invalid) {
      return;
    }
    if (form.valid) {
      const email = localStorage.getItem('email');
      const dueDate = new Date(form.value.dueDate);
      const formattedDueDate = `${(dueDate.getMonth() + 1).toString().padStart(2, '0')}/${dueDate.getDate().toString().padStart(2, '0')}/${dueDate.getFullYear()}`;
      const taskData = {
        is_new: true,
        taskname: form.value.taskName,
        projectid: this.selectedProjectId,
        functionid: form.value.selectedFunction,
        assigneeemail: form.value.selectedAssignee,
        exception: form.value.exceptions,
        special_instruction: form.value.specialInstructions,
        duedate: form.value.dueDate?formattedDueDate:null,
        weightage:3,
        createdby: email
      };
      console.log('Task data:', JSON.stringify(taskData));
      this.spinner = true;
      this.taskService.createTask(taskData).subscribe(response => {
        this.dialogRef.close({ taskCreated: true});
        console.log('Task created successfully:', response);
      }, error => {
        console.error('Error creating task:', error);
      });
    }
  }

}

