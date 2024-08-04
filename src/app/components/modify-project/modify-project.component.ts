import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectserviceService } from 'src/app/services/projectservice.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modify-project',
  templateUrl: './modify-project.component.html',
  styleUrls: ['./modify-project.component.css'],
})
export class ModifyProjectComponent implements OnInit {
  projectId: string = "";
  projectInfo: any;
  functionInfo: any[] = [];
  functionalLeads: any[] = [];
  selectedLeads: any = {};
  showConfirmation: boolean = false;
  showError: boolean = false;
  allfunctionalLeads: any[] = [];
  showModifyProjectForm: boolean = true;
  currentTasks: Array<{ taskId: string; taskName: string; selected?: boolean }> = [];
  otherTasks: Array<{ taskId: string; taskName: string; selected?: boolean }> = [];
  addedTasks: Set<string> = new Set();
  removedTasks: Set<string> = new Set();
  email :any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectserviceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.loadProjectInfo(this.projectId);

    this.authService.getAllUsers().subscribe(
      (users) => {
        this.allfunctionalLeads = users;
        console.log('Functional Leads:', this.allfunctionalLeads);
      },
      (error) => {
        console.error('Error fetching functional leads:', error);
      }
    );

    this.projectService.gettasks(this.projectId).subscribe(
      (tasks: any) => {
        this.currentTasks = (tasks.tasks_in_project || []).map((task: any) => ({ ...task, selected: false }));
        this.otherTasks = (tasks.tasks_not_in_project || []).map((task: any) => ({ ...task, selected: false }));
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  loadProjectInfo(projectId: string): void {
    this.projectService.getModifyProjectInfo(projectId).subscribe(
      (data: any) => {
        this.projectInfo = data.project_info;
        this.functionInfo = data.function_info;
        this.functionalLeads = data.functional_leads;
        this.functionInfo.forEach(func => {
          this.selectedLeads[func.functionid] = func.functionlead;
        });
        console.log(this.projectInfo);
        console.log(this.functionInfo);
      },
      (error) => {
        console.error('Error fetching project info', error);
        this.showError = true;
      }
    );
  }

  addAllTasks(): void {
    this.currentTasks.forEach(task => {
      task.selected = true;
    });
  }

  removeAllTasks(): void {
    this.otherTasks.forEach(task => {
      task.selected = true;
    });
  }

  modifyTasksInProject(): void {
    this.otherTasks
    .filter(task => task.selected)  // Filter selected tasks
    .forEach(task => this.addedTasks.add(task.taskId)); 
    this.currentTasks
    .filter(task => task.selected)  // Filter selected tasks
    .forEach(task => this.removedTasks.add(task.taskId));
    console.log(this.addedTasks);
    console.log(this.removedTasks);
    this.email = this.authService.getEmail();
    this.projectService.modifyTasksInProject(this.projectId, this.email, this.addedTasks, this.removedTasks).subscribe(
      (response) => {
        console.log('Tasks modified:', response);
        this.showConfirmation = true;
      },
      (error) => {
        console.error('Error modifying tasks:', error);
        this.showError = true;
      }
    );
  }

  onSubmit(): void {
    console.log('Project with Functional Leads:', this.projectId, this.selectedLeads);
    this.projectService.modifyprojectLeads(this.projectId, this.selectedLeads).subscribe(
      (response) => {
        console.log('Project updated:', response);
        this.showConfirmation = true;
      },
      (error) => {
        console.error('Error updating project:', error);
        this.showError = true;
      }
    );
  }

  confirmAndRedirect(): void {
    this.router.navigate(['/home']); // Adjust the path as necessary
  }

  confirmAndRedirectToCreateProject(): void {
    this.otherTasks
    .filter(task => task.selected)  // Filter selected tasks
    .forEach(task => this.addedTasks.add(task.taskId)); 
    this.currentTasks
    .filter(task => task.selected)  // Filter selected tasks
    .forEach(task => this.removedTasks.add(task.taskId));
    console.log(this.addedTasks);
    console.log(this.removedTasks);
    console.log(this.authService.getEmail());
  }

  toggleForm(): void {
    this.showModifyProjectForm = !this.showModifyProjectForm;
  }
}
