import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskName: string = '';
  functionId: number | null = null;
  weightage: string = '';
  functions: Array<{ functionId: number, functionName: string }> = [];

  constructor(
    private projectService: ProjectserviceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.projectService.getAllFunctions().subscribe(
      (functions) => {
        this.functions = functions;
      },
      (error) => {
        console.error('Error fetching functions:', error);
      }
    );
  }

  onSubmit() {
    this.projectService.createTaskinTaskMaster(this.taskName, this.functionId!, this.weightage).subscribe(
      (response) => {
        console.log('Task created:', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }
}
