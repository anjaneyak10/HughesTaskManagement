import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-select-tasks',
  template: `
    <h2>Select Tasks for Template</h2>
    <div *ngFor="let task of tasks">
      <input type="checkbox" [(ngModel)]="task.selected"> {{task.taskName}}
    </div>
    <button (click)="addTasksToTemplate()">Done</button>
  `
})
export class SelectTasksComponent implements OnInit {
  tasks: any[] = [];
  templateId: string | null = '';

  constructor(
    private templateService: TemplateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.templateId = this.route.snapshot.paramMap.get('id');
    this.templateService.getAllTasks().subscribe(
      response => {
        this.tasks = response.tasks.map((task: any) => ({ ...task, selected: false }));
      },
      error => console.error('Error fetching tasks:', error)
    );
  }

  addTasksToTemplate() {
    if (this.templateId) {
      const selectedTaskIds = this.tasks
        .filter(task => task.selected)
        .map(task => task.taskid);

      if (selectedTaskIds.length > 0) {
        this.templateService.addTasksToTemplate(this.templateId, selectedTaskIds).subscribe(
          response => {
            console.log('Tasks added to template:', response);
            this.router.navigate(['/home']);
          },
          error => console.error('Error adding tasks to template:', error)
        );
      }
    } else {
      console.error('Invalid template ID:', this.templateId);
    }
  }
}
