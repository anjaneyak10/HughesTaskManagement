import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from 'src/app/services/template.service';

interface Task {
  createdby: string;
  createdbyname: string;
  createdon: string;
  function_id: string;
  function_name: string;
  lastmodifiedby: string | null;
  lastmodifiedbyname: string | null;
  lastmodifiedon: string | null;
  taskid: string;
  taskname: string;
  weightage: string;
  selected: boolean;
}

@Component({
  selector: 'app-select-tasks',
  templateUrl: './select-tasks.component.html',
  styleUrls: ['./select-tasks.component.css']
})
export class SelectTasksComponent implements OnInit {
  tasks: Task[] = [];
  groupedSource: { [key: string]: Task[] } = {};
  groupedConfirmed: { [key: string]: Task[] } = {};
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
        this.tasks = response.tasks.map((task: Task) => ({ ...task, selected: false }));
        this.groupedSource = this.groupTasksByFunction(this.tasks);
        this.groupedConfirmed = {};
      },
      error => console.error('Error fetching tasks:', error)
    );
  }

  groupTasksByFunction(tasks: Task[]): { [key: string]: Task[] } {
    const groupedTasks: { [key: string]: Task[] } = {};
    tasks.forEach(task => {
      if (!groupedTasks[task.function_name]) {
        groupedTasks[task.function_name] = [];
      }
      groupedTasks[task.function_name].push(task);
    });
    return groupedTasks;
  }

  addTask(task: Task) {
    task.selected = true;
    if (!this.groupedConfirmed[task.function_name]) {
      this.groupedConfirmed[task.function_name] = [];
    }
    this.groupedConfirmed[task.function_name].push(task);
    this.groupedSource[task.function_name] = this.groupedSource[task.function_name].filter((t: Task) => t.taskid !== task.taskid);
  }

  removeTask(task: Task) {
    task.selected = false;
    if (!this.groupedSource[task.function_name]) {
      this.groupedSource[task.function_name] = [];
    }
    this.groupedSource[task.function_name].push(task);
    this.groupedConfirmed[task.function_name] = this.groupedConfirmed[task.function_name].filter((t: Task) => t.taskid !== task.taskid);
  }

  addAllTasks() {
    this.groupedConfirmed = this.groupTasksByFunction(this.tasks.map((task: Task) => ({ ...task, selected: true })));
    this.groupedSource = {};
  }

  removeAllTasks() {
    this.groupedSource = this.groupTasksByFunction(this.tasks.map((task: Task) => ({ ...task, selected: false })));
    this.groupedConfirmed = {};
  }

  addTasksToTemplate() {
    if (this.templateId) {
      const selectedTaskIds = Object.values(this.groupedConfirmed).flat().map((task: Task) => task.taskid);

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
