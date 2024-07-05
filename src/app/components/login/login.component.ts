import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  debugMessage: string = '';


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    
    this.debugMessage = 'Form submitted';
    console.log('Form submitted');

    if (this.loginForm.invalid) {
      this.debugMessage = 'Form is invalid';
      console.log('Form is invalid');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      response => {
        console.log('Login response:', response);
        if (response && response.token && response.token.jwt) {
          this.authService.setToken(response.token.jwt);
          this.authService.setUserRole(response.token.user.role);
          const userRole = this.authService.getUserRole();
          console.log('User role:', userRole);
          this.redirectBasedOnRole(userRole);
        } else {
          this.errorMessage = 'Invalid response from server';
        }
      },
      error => {
        console.error('Login error:', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
  }


  private redirectBasedOnRole(userRole: string | null) {
    // console.log('Role:', userRole);
    switch(userRole) {
      case 'xyz':
        this.router.navigate(['employee-dashboard']);
        break;
      case 'executive':
        this.router.navigate(['executive-dashboard']);
        break;
      case 'functional-lead':
        this.router.navigate(['functional-lead-dashboard']);
        break;
      default:
        this.errorMessage = 'Unknown role';
        console.error('Unknown role:', userRole);
    }
  }

}
