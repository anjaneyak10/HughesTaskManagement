// src/app/select-functional-leads/select-functional-leads.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectserviceService } from 'src/app/services/projectservice.service';

@Component({
  selector: 'app-select-functional-leads',
  templateUrl: './select-functional-leads.component.html',
  styleUrls: ['./select-functional-leads.component.css']
})
export class SelectFunctionalLeadsComponent implements OnInit {
  project: any;
  functions: Array<{ function: string }> = [];
  functionalLeads: Array<{ id: number, name: string }> = [
    { id: 1, name: 'Lead A' },
    { id: 2, name: 'Lead B' },
    { id: 3, name: 'Lead C' }
  ];
  selectedLeads: { [key: string]: number } = {};

  constructor(private projectService: ProjectserviceService, private router: Router) {}

  ngOnInit() {
    // Retrieve the project data from the router state
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
  }

  onSubmit() {
    this.project.functionalLeads = this.selectedLeads;
    console.log('Project with Functional Leads:', this.project);
    // Here, you can make a final submission or navigate to another component if needed
  }
}
