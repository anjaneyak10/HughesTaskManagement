// src/app/create-project/create-project.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectserviceService } from 'src/app/services/projectservice.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  projectName: string = '';
  projectTemplateId: number | null = null;
  dueDate: string = '';
  createdBy: string = '';
  portfolio: string = '';

  projectTemplates: Array<{ taskid: number, templateName: string, templateid: number }> = [];

  constructor(private projectService: ProjectserviceService,private router:Router) {}

  ngOnInit() {
    this.projectService.gettemplate().subscribe(
      (templates) => {
        this.projectTemplates = templates; // Assuming templates is an array of template objects
      },
      (error) => {
        console.error('Error fetching templates:', error);
      }
    );
  }

  onSubmit() {
    const project = {
      projectName: this.projectName,
      projectTemplateId: this.projectTemplateId,
      dueDate: this.dueDate,
      createdBy: this.createdBy,
      portfolio: this.portfolio
    };
    console.log('Project Created:', project);

    this.router.navigate(['/select-functional-leads'], { state: { project } });
  }
}
