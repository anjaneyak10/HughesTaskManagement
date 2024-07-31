import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent {

  constructor(private authService: AuthService,
    private router: Router

  ){
  }
  homeButtonClick() {
    this.router.navigate(['/home']);
  }
  projectViewClick(){
    this.router.navigate(['/projectView']);
  }

  createProject() {
    this.router.navigate(['/createproject']);
  }
  modifyTasksClick(){
    this.router.navigate(['/modifytasks']);
  } 
  taskViewClick() {
    this.router.navigate(['/employeedashboard']);
  }

  createTemplate() {
    this.router.navigate(['/create-template']);
  }


  onButton3Click() {
    console.log('Button 3 clicked');
    // Add your logic here
  }

  onButton4Click() {
    console.log('Button 4 clicked');
    // Add your logic here
  }

  createTask() {
    this.router.navigate(['/createtask']);
  }
}
