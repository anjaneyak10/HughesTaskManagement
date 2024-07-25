import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-select-tasks',
  templateUrl: './select-tasks.component.html',
  styleUrls: ['./select-tasks.component.css']
})
export class SelectTasksComponent implements OnInit {
  tasks: any[] = [];
  source: any[] = [];
  confirmed: any[] = [];
  templateId: string | null = '';
  showConfirmation: boolean = false;

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
        this.source = [...this.tasks];
      },
      error => console.error('Error fetching tasks:', error)
    );
  }

  addTask(task: any) {
    task.selected = true;
    this.confirmed.push(task);
    this.source = this.source.filter(t => t.taskid !== task.taskid);
  }

  removeTask(task: any) {
    task.selected = false;
    this.source.push(task);
    this.confirmed = this.confirmed.filter(t => t.taskid !== task.taskid);
  }

  addAllTasks() {
    this.confirmed = this.tasks.map(task => ({ ...task, selected: true }));
    this.source = [];
  }

  removeAllTasks() {
    this.source = this.tasks.map(task => ({ ...task, selected: false }));
    this.confirmed = [];
  }

  addTasksToTemplate() {
    if (this.templateId) {
      const selectedTaskIds = this.confirmed.map(task => task.taskid);

      if (selectedTaskIds.length > 0) {
        this.templateService.addTasksToTemplate(this.templateId, selectedTaskIds).subscribe(
          response => {
            console.log('Tasks added to template:', response);
            this.showConfirmation = true;
          },
          error => console.error('Error adding tasks to template:', error)
        );
      }
    } else {
      console.error('Invalid template ID:', this.templateId);
    }
  }

  confirmAndRedirect() {
    this.router.navigate(['/home']);
  }
}
