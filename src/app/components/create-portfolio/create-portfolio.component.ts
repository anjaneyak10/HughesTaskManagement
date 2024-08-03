import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectserviceService } from 'src/app/services/projectservice.service';

@Component({
  selector: 'app-create-portfolio',
  templateUrl: './create-portfolio.component.html',
  styleUrls: ['./create-portfolio.component.css']
})
export class CreatePortfolioComponent implements OnInit {
  portfolioName: string = '';
  functionId: number | null = null;
  weightage: string = '';
  projects: Array<{ projectId: number, projectName: string }> = [];
  showConfirmation: boolean = false;
  selectedProjects: Array<number> = [];

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

    this.projectService.createPortfolio(this.portfolioName, this.selectedProjects).subscribe(
      (response) => {
        console.log('Portfolio created:', response);
        this.showConfirmation = true;
      },
      (error) => {
        console.error('Error creating portfolio:', error);
      }
    );  
  }
  confirmAndRedirect(){
    this.router.navigate(['/home']);
  }
  cancel(){
    this.router.navigate(['/home']);
  }  
}
