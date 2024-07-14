import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task.service';

interface Project {
  task: string;
  completion: string;
  assignee: string;
  specialInstructions: string;
  exceptions: string;
  dependentTasks: number;
}
interface ProjectSelect{
  name: string;
  projectId:string
}

/*const PROJECT_DATA: Project[] = [
  { task: 'Invoicing', completion: '80%', assignee: '', specialInstructions: '', exceptions: '', dependentTasks: 123 },
  { task: 'Obtain Final Site List', completion: '', assignee: 'Nike', specialInstructions: 'Something special', exceptions: 'Some Exception', dependentTasks: 1 },
  { task: 'Obtain Final Site List', completion: '', assignee: 'Nike', specialInstructions: 'Something special', exceptions: 'Some Exception', dependentTasks: 1 },
  { task: 'Something Else', completion: '80%', assignee: '', specialInstructions: '', exceptions: '', dependentTasks: 123 },
  { task: 'Obtain Final Site List', completion: '', assignee: 'Nike', specialInstructions: 'Something special', exceptions: 'Some Exception', dependentTasks: 1 }
];*/
const PROJECT_DATA: Project[] = [];
const projectList: ProjectSelect[] = []

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  displayedColumns: string[] = ['task', 'completion', 'assignee', 'specialInstructions', 'exceptions', 'dependentTasks'];
  dataSource = new MatTableDataSource(PROJECT_DATA);
  projectNames: string[] =[];
  spinner = true;
  constructor(private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.taskService.getProjectList('sst@gmail.com').subscribe(tasks => {
      const uniqueProjectNames: Set<string> = new Set(); // Use a Set to store unique names
      tasks.forEach((proj: any) => {
        projectList.push({name:proj[1],projectId:proj[0]}); // Add project name to the Set
      });
      this.projectNames = Array.from(new Set(projectList.map(project => project.name))); // Convert Set back to array of project names
      this.spinner = false;
    });
  }

  applyFilter(filterValue: string): void {
    this.spinner = true;
    for(let i in projectList){
      if(projectList[i].name == filterValue){
        filterValue = projectList[i].projectId;
      }
    }
    this.taskService.getProjectInfo(filterValue).subscribe(projectInfo => {
      console.log(projectInfo);
      this.spinner = false;
    });

    
  }
}