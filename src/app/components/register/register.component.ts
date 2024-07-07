import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      role: ['', [Validators.required]],
      function: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.registerForm.get('email');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get role() {
    return this.registerForm.get('role');
  }

  get function() {
    return this.registerForm.get('function');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { email, name, username, role, func, password } = this.registerForm.value;

    this.authService.register(email, name, username, role, func, password).subscribe(
      response => {
        if (response.message === 'User created successfully') {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'User already exists';
        }
      },
      error => {
        console.error('Registration error:', error);
        this.errorMessage = 'An error occurred during registration';
      }
    );
  }
}
