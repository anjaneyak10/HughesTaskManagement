import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CreateTaskModalComponent } from 'src/app/components/create-task-modal/create-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

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
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
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
  selectedProject:any;
  
  constructor(private taskService: TaskService, public dialog: MatDialog, private snackBar: MatSnackBar, private router: Router,private authService: AuthService) {
    this.expandedElement = null;
    this.selectedProject = null;
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

  selectProject(filterValue: string): void {
    this.spinnerTable = true;
    const selectedProject = projectList.find(
      (project) => project.name === filterValue
    );
    if (selectedProject) {
      this.selectedProject = selectedProject;
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
      width: 'auto', // Set your desired width
      height: 'auto', // Set your desired height
      data: { selectedProjectId: this.selectedProject.projectId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.taskCreated) {
        this.showToast('Task created successfully!');
        this.selectProject(this.selectedProject.name);
      }
    });
  }
  showToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 10000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  navigateToModifyProject(): void {
    if (this.selectedProject && this.selectedProject.projectId) {
      this.router.navigate([`/modifyproject`, this.selectedProject.projectId]);
    } else {
      this.showToast('Please select a project first.');
    }
    // this.router.navigate(['/modifyproject']);
  }
}

