import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisrtationService } from './../../core/services/auth/regisrtation.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errormesaage: string = '';
  isLoading: boolean = false;
  private router = inject(Router);
  private readonly regisrtationService = inject(RegisrtationService);
  registerforms: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/),
      ]),
    },
    this.confirmpassword
  );

  registersubmit() {
    if (this.registerforms.valid) this.isLoading = true;
    this.regisrtationService
      .sendregisterdata(this.registerforms.value)
      .subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.router.navigate(['/login']);
            res.token
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;

          this.errormesaage = err.error.message;
        },
      });
  }

  confirmpassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { notmatched: true };
    }
  }
}
