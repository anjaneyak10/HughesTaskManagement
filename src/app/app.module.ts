import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './components/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import  {HomeComponent} from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component'; 
import { AuthInterceptor } from './components/interceptors/auth.interceptor';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { FunctionalLeadDashboardComponent } from './components/functional-lead-dashboard/functional-lead-dashboard.component';
import { ExecutiveDashboardComponent } from './components/executive-dashboard/executive-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { SelectFunctionalLeadsComponent } from './components/select-functional-leads/select-functional-leads.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProjectViewComponent } from './components/project-view/project-view.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Import MatNativeDateModule
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AgGridAngular } from 'ag-grid-angular';


import { CreateTemplateComponent } from './components/create-template/create-template.component';
import { SelectTasksComponent } from './components/select-tasks/select-tasks.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ModifyTasksComponent } from './components/modify-tasks/modify-tasks.component';
import { ModifyTaskModalComponent } from './components/modify-task-modal/modify-task-modal.component';


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
    ProjectViewComponent,
    RegisterComponent,
    CreateTemplateComponent,
    SelectTasksComponent,
    HomeComponent,
    RegisterComponent,
    CreateTaskModalComponent,
    CreateTaskComponent,
    ModifyTasksComponent,
    ModifyTaskModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    AgGridAngular
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }