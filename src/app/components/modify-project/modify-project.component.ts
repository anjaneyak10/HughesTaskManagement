// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-modify-project',
//   templateUrl: './modify-project.component.html',
//   styleUrls: ['./modify-project.component.css']
// })
// export class ModifyProjectComponent {

// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectserviceService } from 'src/app/services/projectservice.service'; // Adjust the import path
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


  constructor(private route: ActivatedRoute, private projectService: ProjectserviceService,private router: Router,private authService: AuthService) {}

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
  }

  loadProjectInfo(projectId: string): void {
    this.projectService.getModifyProjectInfo(projectId).subscribe(
      data => {
        this.projectInfo = data.project_info;
        this.functionInfo = data.function_info;
        this.functionalLeads = data.functional_leads; // Assuming this data structure exists
        this.functionInfo.forEach(func => {
          this.selectedLeads[func.functionid] = func.functionlead;
        });
        console.log(this.projectInfo);
        console.log(this.functionInfo);
      },
      error => {
        console.error('Error fetching project info', error);
        this.showError = true;
      }
    );
  }
  
  onSubmit(): void {
    console.log('Project with Functional Leads:', this.projectId, this.selectedLeads);
    this.projectService.modifyprojectLeads( this.projectId, this.selectedLeads).subscribe(
      (response) => {
        console.log('Project created:', response);
        this.showConfirmation = true;

      },
      (error) => {
        console.error('Error creating project:', error);
        this.showError = true;
      }
    );
  }

  confirmAndRedirect(): void {
    this.router.navigate(['/home']); // Adjust the path as necessary
  }

  confirmAndRedirectToCreateProject(): void {
    this.showError = false;
  }
}
