import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ExecutiveDashboardComponent } from './executive-dashboard/executive-dashboard.component';
import { FunctionalLeadDashboardComponent } from './functional-lead-dashboard/functional-lead-dashboard.component';
import  {HomeComponent} from './home/home.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SelectFunctionalLeadsComponent } from './select-functional-leads/select-functional-leads.component';

import { ProjectViewComponent } from './project-view/project-view.component';

import { RegisterComponent } from './register/register.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { SelectTasksComponent } from './select-tasks/select-tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ModifyTasksComponent } from './modify-tasks/modify-tasks.component';
import { ModifyProjectComponent } from './modify-project/modify-project.component';
import { CreatePortfolioComponent } from './create-portfolio/create-portfolio.component';
import { SelectProjectForModifyComponent } from './select-project-for-modify/select-project-for-modify.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'employeedashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard] },
  { path: 'executivedashboard' , component: ExecutiveDashboardComponent, canActivate: [AuthGuard]},
  { path: 'functionalleaddashboard' , component: ExecutiveDashboardComponent, canActivate: [AuthGuard]},
  {path:'createproject',component:CreateProjectComponent,canActivate:[AuthGuard]},
  {path:'projectView',component:ProjectViewComponent,canActivate:[AuthGuard]},
  {path:'select-functional-leads',component:SelectFunctionalLeadsComponent,canActivate:[AuthGuard]},
  { path: 'create-template', component: CreateTemplateComponent, canActivate: [AuthGuard] },
  { path: 'select-tasks/:id', component: SelectTasksComponent,  canActivate: [AuthGuard] },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'createtask',component:CreateTaskComponent,canActivate:[AuthGuard]},
  {path:'modifytasks',component:ModifyTasksComponent,canActivate:[AuthGuard]},
  { path: 'register', component: RegisterComponent },
  {path:'modifyproject/:projectId',component:ModifyProjectComponent,canActivate:[AuthGuard]},
  {path:'create-portfolio',component:CreatePortfolioComponent},
  {path:'select-project-for-modify',component:SelectProjectForModifyComponent,canActivate:[AuthGuard]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }