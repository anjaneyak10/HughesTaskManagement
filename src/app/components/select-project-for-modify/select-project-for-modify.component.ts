import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';

@Component({
  selector: 'app-select-project-for-modify',
  templateUrl: './select-project-for-modify.component.html',
  styleUrls: ['./select-project-for-modify.component.css']
})
export class SelectProjectForModifyComponent {

  portfolioName: string = '';
  functionId: number | null = null;
  weightage: string = '';
  projects: Array<{ projectId: number, projectName: string }> = [];
  showConfirmation: boolean = false;
  selectedProjects: number | null = null; 

  constructor(
    private projectService: ProjectserviceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching functions:', error);
      }
    );
  }

  onSubmit() {

   this.router.navigate(['/modifyproject/'+this.selectedProjects]);  
  }
  confirmAndRedirect(){
    this.router.navigate(['/home']);
  }
  cancel(){
    this.router.navigate(['/home']);
  }  

}
