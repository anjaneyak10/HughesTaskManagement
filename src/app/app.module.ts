import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './components/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { FunctionalLeadDashboardComponent } from './components/functional-lead-dashboard/functional-lead-dashboard.component';
import { ExecutiveDashboardComponent } from './components/executive-dashboard/executive-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { SelectFunctionalLeadsComponent } from './components/select-functional-leads/select-functional-leads.component';
import { RegisterComponent } from './components/register/register.component'; 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeDashboardComponent,
    FunctionalLeadDashboardComponent,
    ExecutiveDashboardComponent,
    NavbarComponent,
    CreateProjectComponent,
    SelectFunctionalLeadsComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }