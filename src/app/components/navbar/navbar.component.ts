import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService: AuthService){
  }
  homeButtonClick() {
    this.authService.navigateBasedOnUserRole();
    
  }

  onButton2Click() {
    console.log('Button 2 clicked');
    // Add your logic here
  }

  onButton3Click() {
    console.log('Button 3 clicked');
    // Add your logic here
  }

  onButton4Click() {
    console.log('Button 4 clicked');
    // Add your logic here
  }
}
