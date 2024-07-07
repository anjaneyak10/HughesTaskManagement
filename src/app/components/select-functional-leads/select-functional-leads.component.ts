// src/app/select-functional-leads/select-functional-leads.component.ts
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
  functions: Array<{ function: string }> = [];
  functionalLeads: Array<{ email: string, function: string, name: string, role: string, username: string }> = [];

  selectedLeads: { [key: string]: number } = {};

  constructor(private projectService: ProjectserviceService, private router: Router,private authService:AuthService) {}


  ngOnInit() {
    // Retrieve the project data from the router state
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
    this.projectService.getFunctions().subscribe(
      (functions) => {
        this.functions = functions;
        console.log('Functions:', this.functions);
      },
      (error) => {
        console.error('Error fetching functions:', error);
      }
    );
    console.log('Project:', this.project);
  }

  onSubmit() {
    this.project.functionalLeads = this.selectedLeads;
    console.log('Project with Functional Leads:', this.project);
    
  }
}
