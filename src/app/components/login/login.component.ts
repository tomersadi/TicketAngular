import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // adjust path
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  loading = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

onSubmit(): void {
  if (this.loginForm.invalid) return;

  this.loading = true;
  this.loginError = null;

  const { username, password } = this.loginForm.value;

  this.authService.login(username, password).subscribe({
    next: (response) => {
      this.loading = false;
      if (response && response.token) {
        // save token string only
        localStorage.setItem('jwt', response.token);

        // save token expiration separately
        localStorage.setItem('jwt_expiration', response.expiration);
        this.router.navigate(['/tickets']); // redirect
      } else {
        this.loginError = 'Invalid username or password';
      }
    },
    error: (err) => {
      this.loading = false;
      this.loginError = 'Server error. Please try again later.';
      console.error(err);
    }
  });
}


}
