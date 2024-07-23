import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent {
  templateName: string = '';

  constructor(
    private templateService: TemplateService,
    private router: Router,
    private authService: AuthService
  ) {}

  createTemplate() {
    const createdBy = this.authService.getEmail();
    if (createdBy && this.templateName.trim()) {
      this.templateService.createTemplate({ templateName: this.templateName, createdBy })
        .subscribe(
          response => {
            console.log('Template created:', response);
            this.router.navigate(['/select-tasks', response.template_id]);
          },
          error => console.error('Error creating template:', error)
        );
    } else {
      console.error('User email is not available or template name is empty.');
    }
  }
}