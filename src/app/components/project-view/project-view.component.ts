import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CreateTaskModalComponent } from 'src/app/components/create-task-modal/create-task-modal.component';
import { MatDialog } from '@angular/material/dialog';

interface Project {
  data: {
    task: string;
    completion: string;
    assignee: string;
    specialInstructions: string;
    exception: string;
  }[];
  function: string;
}

interface ProjectSelect {
  name: string;
  projectId: string;
}

const projectList: ProjectSelect[] = [];

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ProjectViewComponent implements OnInit {
  displayedColumns: string[] = ['function'];
  dataSource = new MatTableDataSource<Project>([]);
  projectNames: string[] = [];
  projectProgress = 75;
  spinner = true;
  spinnerTable = false;
  columnsToDisplay = ['function'];
  expandedElement: Project | null;

  constructor(private taskService: TaskService, public dialog: MatDialog) {
    this.expandedElement = null;
  }

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.taskService.getProjectList(email).subscribe((tasks) => {
        tasks.forEach((proj: any) => {
          projectList.push({
            name: proj.projectname,
            projectId: proj.projectid,
          });
        });
        this.projectNames = Array.from(
          new Set(projectList.map((project) => project.name))
        );
        this.spinner = false;
      });
    }
  }

  applyFilter(filterValue: string): void {
    this.spinnerTable = true;
    const selectedProject = projectList.find(
      (project) => project.name === filterValue
    );
    if (selectedProject) {
      this.taskService
        .getProjectInfo(selectedProject.projectId)
        .subscribe((projectInfo) => {
          const PROJECT_DATA: Project[] = [];
          projectInfo.forEach((i: any) => {
            if (PROJECT_DATA.find((x) => x.function === i.function)) {
              PROJECT_DATA.find((x) => x.function === i.function)!.data.push({
                task: i.taskname,
                completion: i.completion,
                assignee: i.assignee,
                specialInstructions: i.specialinstructions,
                exception: i.exception,
              });
            } else {
              PROJECT_DATA.push({
                data: [
                  {
                    task: i.taskname,
                    completion: i.completion,
                    assignee: i.assignee,
                    specialInstructions: i.specialinstructions,
                    exception: i.exception,
                  },
                ],
                function: i.function,
              });
            }
          });
          console.log(JSON.stringify(PROJECT_DATA));
          this.dataSource.data = PROJECT_DATA;
          this.spinnerTable = false;
        });
    }
  }

  openCreateTaskModal(): void {
    const dialogRef = this.dialog.open(CreateTaskModalComponent, {
      width: '30%',
      // data: { any data to pass }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // Handle result if needed
    });
  }
}
