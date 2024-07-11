import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  openTasks: any[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getOpenTasks('employee@test.com').subscribe(tasks => {
      this.openTasks = tasks;
      console.log("@@@"+this.openTasks)
    });
  }
  /*ngOnInit(): void {
    this.taskService.getclosedTasks('employee@test.com').subscribe(tasks => {
      this.openTasks = tasks;
      console.log("@@@"+this.openTasks)
    });*/
  }


