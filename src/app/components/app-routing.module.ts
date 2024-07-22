import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ExecutiveDashboardComponent } from './executive-dashboard/executive-dashboard.component';
import { FunctionalLeadDashboardComponent } from './functional-lead-dashboard/functional-lead-dashboard.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { SelectFunctionalLeadsComponent } from './select-functional-leads/select-functional-leads.component';

import { ProjectViewComponent } from './project-view/project-view.component';

import { RegisterComponent } from './register/register.component';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { SelectTasksComponent } from './select-tasks/select-tasks.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'employeedashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard] },
  { path: 'executivedashboard' , component: ExecutiveDashboardComponent, canActivate: [AuthGuard]},
  { path: 'functionalleaddashboard' , component: ExecutiveDashboardComponent, canActivate: [AuthGuard]},
  {path:'createproject',component:CreateProjectComponent,canActivate:[AuthGuard]},
  {path:'projectView',component:ProjectViewComponent,canActivate:[AuthGuard]},
  {path:'select-functional-leads',component:SelectFunctionalLeadsComponent,canActivate:[AuthGuard]},
  { path: 'create-template', component: CreateTemplateComponent },
  { path: 'select-tasks/:id', component: SelectTasksComponent },

  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }