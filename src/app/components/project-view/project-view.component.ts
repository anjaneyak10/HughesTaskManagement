import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task.service';
import { TemplateService } from 'src/app/services/template.service';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  ILargeTextEditorParams,
  IRichCellEditorParams,
  ISelectCellEditorParams,
  ITextCellEditorParams,
  createGrid,
} from "ag-grid-community";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CreateTaskModalComponent } from 'src/app/components/create-task-modal/create-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

interface Project {
  data: {
    task: string;
    completion: string;
    assignee: string;
    specialInstructions: string;
    exception: string;
  }[];
  function: string;
}
interface Task {
  assigneeemail: string;
  assigneename: string;
  completion: boolean;
  createdby: string;
  createdon: string;
  duedate: string | null;
  exception: string | null;
  lastupdatedby: string | null;
  lastupdatedon: string | null;
  projecttaskid: string;
  specialinstruction: string | null;
  taskname: string;
  weightage: string;
}

interface FunctionInfo {
  functionid: string;
  functionleademail: string;
  functionleadname: string;
  functionname: string;
  functionreadinessscore: string;
  tasks: Task[];
}

interface ProjectDetails {
  completion: boolean;
  createdbyemail: string;
  createdon: string;
  functions_info: FunctionInfo[];
  projectid: string;
  projectname: string;
  projecttemplateid: string;
  readinessscore: string;
}
interface taskChange{
  projecttaskid: string;
  assigneeemail: string;
  email: string;
}

interface ProjectSelect {
  name: string;
  projectId: string;
}

const projectList: ProjectSelect[] = [];

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ProjectViewComponent implements OnInit {
  dataSource = new MatTableDataSource<FunctionInfo>([]);
  projectNames: string[] = [];
  projectProgress: any;
  spinner = true;
  functions: any[] = [];
  assignees: any[] = [];
  taskChanges: taskChange[] = [];
  spinnerTable = false;
  columnsToDisplay = ['function', 'score', 'leadName', 'expand'];
  expandedElement: FunctionInfo | null;
  selectedProject: any;
  columnDefs = [
    { headerName: 'Task', field: 'taskname' },
    {
      headerName: 'Completion',
      field: 'completion',
      cellRenderer: (params: any) => {
        const icon = params.value ? 'check_circle' : 'cancel';
        const className = params.value ? 'completed' : 'not-completed';
        return `<mat-icon class="${className}">${icon}</mat-icon>`;
      },
    },
    {
      headerName: 'Assignee Email',
      field: 'assigneeemail',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['dorothy.gordon@hughes.com', 'shruti.nagaraj@hughes.com', 'sindhu.rajan@hughes.com', 'test1@test.com', 'test@test.com'],
        filterList: true,
      } as ISelectCellEditorParams,
      onCellValueChanged: (params: any) => {
        this.updateTask(params.data);
      },
    },
    { headerName: 'Created By', field: 'createdby' },
    {
      headerName: 'Created On',
      field: 'createdon',
      cellRenderer: (params: any) => {
        const date = new Date(params.value);
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
      },
    },
    {
      headerName: 'Due Date',
      field: 'duedate',
      cellRenderer: (params: any) => {
        const date = new Date(params.value);
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
      },
    },
    { headerName: 'Exception', field: 'exception' },
    { headerName: 'Last Updated By', field: 'lastupdatedby' },
    {
      headerName: 'Last Updated On',
      field: 'lastupdatedon',
      cellRenderer: (params: any) => {
        const date = new Date(params.value);
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
      },
    },
    { headerName: 'Special Instructions', field: 'specialinstruction' },
    { headerName: 'Weightage', field: 'weightage' },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,
  };

  rowClassRules = {
    'even-row': (params: any) => params.node.rowIndex % 2 === 0,
    'odd-row': (params: any) => params.node.rowIndex % 2 !== 0,
  };
  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private TemplateService: TemplateService,
    private router: Router  ) {
    this.expandedElement = null;
    this.selectedProject = null;
  }


  ngOnInit(): void {
    const email = localStorage.getItem('email');
    this.TemplateService.getAllEmails()
    .subscribe((resp) => {
      this.assignees = resp.employees.map((employee: { email: string }) => employee.email);
      console.log(this.assignees);
    });
    if (email) {
      this.taskService.getProjectList(email).subscribe((tasks) => {
        tasks.forEach((proj: any) => {
          projectList.push({
            name: proj.projectname,
            projectId: proj.projectid,
          });
        });
        this.projectNames = Array.from(
          new Set(projectList.map((project) => project.name))
        );
        this.spinner = false;
      });
    }
  }
  updateTask(task: Task): void {
    if(this.taskChanges.find((taskChange) => taskChange.projecttaskid === task.projecttaskid)){
      this.taskChanges = this.taskChanges.filter((taskChange) => taskChange.assigneeemail = task.assigneeemail);
    }
    else{
      this.taskChanges.push({
        projecttaskid: task.projecttaskid,
        assigneeemail: task.assigneeemail,
        email: task.assigneeemail,
      });
    }
  }
  selectProject(filterValue: string): void {
    this.spinnerTable = true;
    const selectedProject = projectList.find(
      (project) => project.name === filterValue
    );
    if (selectedProject) {
      this.selectedProject = selectedProject;
        this.taskService
          .getProjectInfo(selectedProject.projectId)
          .subscribe((projectInfo: ProjectDetails) => {
          this.projectProgress = projectInfo.readinessscore;
          this.dataSource.data = projectInfo.functions_info;
          this.spinnerTable = false;
        });
    }
  }
  saveChanges(): void {
    if(this.taskChanges.length === 0){
    this.spinnerTable = true;
    this.taskService.changeAssignees(this.taskChanges).subscribe((resp) => {
      console.log(resp);

        this.showToast('Assignees updated successfully!');
        this.selectProject(this.selectedProject.name);
      
    });
   }
  }
  openCreateTaskModal(): void {
    const dialogRef = this.dialog.open(CreateTaskModalComponent, {
      width: 'auto', // Set your desired width
      height: 'auto', // Set your desired height
      data: { selectedProjectId: this.selectedProject.projectId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.taskCreated) {
        this.showToast('Task created successfully!');
        this.selectProject(this.selectedProject.name);
      }
    });
  }
  showToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 10000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  navigateToModifyProject(): void {
    if (this.selectedProject && this.selectedProject.projectId) {
      this.router.navigate([`/modifyproject`, this.selectedProject.projectId]);
    } else {
      this.showToast('Please select a project first.');
    }
    // this.router.navigate(['/modifyproject']);
  }
}
