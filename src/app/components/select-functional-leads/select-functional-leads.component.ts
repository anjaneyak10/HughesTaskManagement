import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';


@Component({
  selector: 'app-select-functional-leads',
  templateUrl: './select-functional-leads.component.html',
  styleUrls: ['./select-functional-leads.component.css']
})
export class SelectFunctionalLeadsComponent implements OnInit {
  project: any;
  functions: Array<{ functionId: string, functionName: string }> = [];
  functionalLeads: Array<{ email: string, function: string, name: string, role: string, username: string }> = [];
  selectedLeads: { [key: string]: string } = {};
  showConfirmation: boolean = false;
  showError: boolean = false;

  constructor(private projectService: ProjectserviceService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAllUsers().subscribe(
      (users) => {
        this.functionalLeads = users;
        console.log('Functional Leads:', this.functionalLeads);
      },
      (error) => {
        console.error('Error fetching functional leads:', error);
      }
    );

    this.project = history.state.project;
    this.projectService.getFunctions(this.project.projectTemplateId).subscribe(
      (functions) => {
        this.functions = functions;
        console.log('Functions:', this.functions);
        console.log('Selected Leads:', this.selectedLeads);
      },
      (error) => {
        console.error('Error fetching functions:', error);
      }
    );
    
    for (let i = 0; i < this.functions.length; i++) {
      this.selectedLeads[this.functions[i].functionId] = '';
      console.log(this.functions[i].functionId, this.selectedLeads[this.functions[i].functionId]);
    }

    console.log('Project:', this.project);
  }

  onSubmit() {
      console.log('Project with Functional Leads:', this.project, this.selectedLeads);
      this.projectService.createProject(this.project.projectName, this.project.projectTemplateId, this.project.createdByEmail, this.selectedLeads).subscribe(
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

  confirmAndRedirect() {
    this.router.navigate(['/home']);
  }
  confirmAndRedirectToCreateProject(){
    this.router.navigate(['/createproject']);
  }
}
