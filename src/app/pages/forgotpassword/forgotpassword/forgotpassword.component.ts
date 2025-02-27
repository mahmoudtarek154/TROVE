import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { RegisrtationService } from '../../../core/services/auth/regisrtation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  private readonly regisrtationService = inject(RegisrtationService);
  private readonly router = inject(Router);
  step: number = 1;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifycode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6}$/),
    ]),
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-zA-Z0-9]{6,10}$/),
    ]),
  });

  verifyEmailSubmit():void {
    this.regisrtationService
      .setEmailPassword(this.verifyEmail.value)
      .subscribe({
        next: (res:any) => {
          console.log(res);

          if (res.statusMsg === 'success') {
            this.step = 2;
          }
        },
      });
  }

  verifyCodeSubmit(): void {
    this.regisrtationService.setCodeVerify(this.verifycode.value).subscribe({
      next: (res:any) => {
        console.log(res);

        if (res.status === 'Success') {
          this.step = 3;
        }
      },
    });
  }

  resetPasswordSubmit(): void {
    this.regisrtationService
      .setResetPassword(this.resetPassword.value)
      .subscribe({
        next: (res:any) => {
          console.log(res);
          localStorage.setItem('usertoken', res.token);
          this.regisrtationService.savedata();
          this.router.navigate(['/home']);
        },
      });
  }
}
