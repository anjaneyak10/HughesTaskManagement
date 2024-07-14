import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

interface Task {
  name: string;
  organization: string;
  assignee: string;
  specialInstructions: string;
  exceptions: string;
}

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent {
  openTasks: any[] = [];
  closedTasks: any[] = [];
  displayedColumns: string[] = ['taskName', 'company', 'assignee', 'specialInstructions', 'exceptions'];

  upcomingTasks: Task[] = [
    { name: 'Obtain Final Site List', organization: 'Nike', assignee: 'Anjan', specialInstructions: 'Something special', exceptions: 'Some Exception' },
    { name: 'Obtain Final Site List', organization: 'Nike', assignee: 'Anjan', specialInstructions: 'Something special', exceptions: 'Some Exception' },
    { name: 'Obtain Final Site List', organization: 'Nike', assignee: 'Anjan', specialInstructions: 'Something special', exceptions: 'Some Exception' },
    { name: 'Obtain Final Site List', organization: 'Nike', assignee: 'Anjan', specialInstructions: 'Something special', exceptions: 'Some Exception' }
  ];

  overdueTasks: Task[] = [
    { name: 'Obtain Final Site List', organization: 'Nike', assignee: 'Anjan', specialInstructions: 'Something special', exceptions: 'Some Exception' },
    // Add more overdue tasks here
  ];

  completedTasks: Task[] = [
    { name: 'Obtain Final Site List', organization: 'Nike', assignee: 'Anjan', specialInstructions: 'Something special', exceptions: 'Some Exception' },
    // Add more completed tasks here
  ];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getOpenTasks('employee@test.com').subscribe(tasks => {
      this.openTasks = tasks;
      console.log("@@@"+this.openTasks)
    });
    this.taskService.getclosedTasks('employee@test.com').subscribe(tasks => {
      this.closedTasks = tasks;
      console.log("@@@"+this.closedTasks)});
  }
  createTask() {
    // Add logic to create a new task
  }
}


