import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface Project {
  task: string;
  completion: string;
  assignee: string;
  specialInstructions: string;
  exceptions: string;
  dependentTasks: number;
}

const PROJECT_DATA: Project[] = [
  { task: 'Invoicing', completion: '80%', assignee: '', specialInstructions: '', exceptions: '', dependentTasks: 123 },
  { task: 'Obtain Final Site List', completion: '', assignee: 'Nike', specialInstructions: 'Something special', exceptions: 'Some Exception', dependentTasks: 1 },
  { task: 'Obtain Final Site List', completion: '', assignee: 'Nike', specialInstructions: 'Something special', exceptions: 'Some Exception', dependentTasks: 1 },
  { task: 'Something Else', completion: '80%', assignee: '', specialInstructions: '', exceptions: '', dependentTasks: 123 },
  { task: 'Obtain Final Site List', completion: '', assignee: 'Nike', specialInstructions: 'Something special', exceptions: 'Some Exception', dependentTasks: 1 }
];

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  displayedColumns: string[] = ['task', 'completion', 'assignee', 'specialInstructions', 'exceptions', 'dependentTasks'];
  dataSource = new MatTableDataSource(PROJECT_DATA);

  constructor() { }

  ngOnInit(): void { }

  applyFilter(filterValue: string|null): void {
    this.dataSource.filter = filterValue ? filterValue.trim().toLowerCase() : '';
  }

}
