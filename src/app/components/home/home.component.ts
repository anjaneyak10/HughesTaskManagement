import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  projectCount = 0;
  completedTasks=0;
  incompleteTasks= 0;
  overdueTasks= 0;
  totalTasks=0;
  spinner = false;

  constructor(private taskService: TaskService) {
  }
ngOnInit(): void {
  this.spinner = true;
    const email = localStorage.getItem('email');
    if (email) {
      // Fetch the summary of tasks for the logged in user
    this.taskService.getSummary(email).subscribe((response) => {
      this.projectCount = response.project_count;
      this.completedTasks = response.closed_tasks_count;
      this.incompleteTasks = response.open_tasks_count;
      this.overdueTasks = response.overdue_tasks_count;
      this.totalTasks = this.completedTasks + this.incompleteTasks;
      this.spinner = false;
    });
  }
}
}
