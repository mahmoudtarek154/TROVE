import { Component, inject } from '@angular/core';
import { RegisrtationService } from '../../core/services/auth/regisrtation.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
  NonNullableFormBuilder,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errormesaage: string = '';
  isLoading: boolean = false;
  private router = inject(Router);
  private readonly regisrtationService = inject(RegisrtationService);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  loginForms = this.formBuilder.group({
    email: this.formBuilder.control<string>(null!, [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control<string>(null!, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/),
    ]),
  });

  LoginComponent: any;

  loginsubmit() {
    if (this.loginForms.valid) this.isLoading = true;
    this.regisrtationService
      .sendlogindata(this.loginForms.getRawValue())
      .subscribe({
        next: (res) => {
          if (res.message === 'success') {
            localStorage.setItem('usertoken', res.token);

            this.regisrtationService.savedata();
            this.router.navigate(['/home']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
  }
}
