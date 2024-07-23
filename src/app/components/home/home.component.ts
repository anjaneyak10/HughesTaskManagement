import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  totalTasks: number;
  completedTasks: number;
  incompleteTasks: number;
  overdueTasks: number;

  constructor() {
    // Initialize your variables here
    // Example initialization (you might want to fetch these values from a service)
    this.totalTasks = 100; // Example total
    this.completedTasks = 70; // Example completed tasks
    this.incompleteTasks = 20; // Example incomplete tasks
    this.overdueTasks = 10; // Example overdue tasks
  }
  ngOnInit(): void {
    // Fetch tasks data here if fetching from a service
  }
}
