import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { AuthService } from 'src/app/services/auth.service';  

@Component({
  selector: 'app-create-template',
  template: `
    <h2>Create New Template</h2>
    <input [(ngModel)]="templateName" placeholder="Enter template name" required>
    <button (click)="createTemplate()" [disabled]="!templateName">Create Template</button>
  `,
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent {
  templateName: string = '';

  constructor(private templateService: TemplateService, private router: Router, private authService: AuthService) { }

  createTemplate() {
    const createdBy = this.authService.getEmail();  // **Retrieve user email from AuthService**
    if (createdBy) {
      this.templateService.createTemplate({ templateName: this.templateName, createdBy })  // **Pass data object to service**
        .subscribe(
          response => {
            console.log('Template created:', response);
            this.router.navigate(['/select-tasks', response.template_id]);
          },
          error => console.error('Error creating template:', error)
        );
    } else {
      console.error('User email is not available.');
    }
  }
}
