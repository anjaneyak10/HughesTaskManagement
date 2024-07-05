import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ExecutiveDashboardComponent } from './executive-dashboard/executive-dashboard.component';
import { FunctionalLeadDashboardComponent } from './functional-lead-dashboard/functional-lead-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard] },
  { path: 'executivedashboard' , component: ExecutiveDashboardComponent, canActivate: [AuthGuard]},
  { path: 'functionalleaddashboard' , component: ExecutiveDashboardComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }