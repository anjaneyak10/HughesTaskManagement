import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task.service';

interface Project {
  task: string;
  completion: string;
  assignee: string;
  specialInstructions: string;
  exceptions: string;
  function:string;
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
var PROJECT_DATA: Project[] = [];
const projectList: ProjectSelect[] = []

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  displayedColumns: string[] = ['function','task', 'completion', 'assignee', 'specialInstructions', 'exceptions'];
  dataSource: MatTableDataSource<Project>;
  projectNames: string[] =[];
  spinner = true;
  spinnerTable=false;
  constructor(private taskService: TaskService) {
    this.dataSource = new MatTableDataSource<Project>([]);
  }

  ngOnInit(): void {
    this.taskService.getProjectList('sst@gmail.com').subscribe(tasks => {
      console.log(JSON.stringify(tasks));
      tasks.forEach((proj: any) => {
        projectList.push({name:proj.projectname,projectId:proj.projectid}); // Add project name to the Set
      });
      this.projectNames = Array.from(new Set(projectList.map(project => project.name))); // Convert Set back to array of project names
      console.log(this.projectNames);
      this.spinner = false;
    });
  }

  applyFilter(filterValue: string): void {
    this.spinnerTable = true;
    for(let i in projectList){
      if(projectList[i].name == filterValue){
        filterValue = projectList[i].projectId;
      }
    }
    this.taskService.getProjectInfo(filterValue).subscribe(projectInfo => {
      console.log(filterValue);
      console.log(JSON.stringify(projectInfo));
      this.dataSource = new MatTableDataSource<Project>([]);
      this.spinnerTable = true;
      PROJECT_DATA=[]
      projectInfo.forEach((i: any) => {
      PROJECT_DATA.push({ task: i.taskname, completion: i.completion, assignee: i.assignee, specialInstructions: i.specialinstructions, exceptions: i.exceptions,function:i.function});
      });
      console.log(PROJECT_DATA)
      this.dataSource = new MatTableDataSource(PROJECT_DATA);
      this.spinnerTable = false;
    });
  }
}