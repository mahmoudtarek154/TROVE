// import { Component, inject, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { OrdersService } from './../../core/services/orders/orders.service';
// import { TranslatePipe } from '@ngx-translate/core';
// import { ToastrService } from 'ngx-toastr';
// import { jwtDecode } from 'jwt-decode';


// @Component({
//   selector: 'app-checkout',
//   imports: [ReactiveFormsModule, TranslatePipe],
//   templateUrl: './checkout.component.html',
//   styleUrl: './checkout.component.scss',
// })
// export class CheckoutComponent implements OnInit {
//   checkoutForms!: FormGroup;
//   private readonly formbuilder = inject(FormBuilder);
//   private readonly activatedroute = inject(ActivatedRoute);
//   private readonly ordersService = inject(OrdersService);
//   private readonly toastrService = inject(ToastrService);

//   cartId: string = '';
//   ngOnInit(): void {
//     this.chckoutFormInut();
//     this.getCartId();



//      const token = localStorage.getItem('usertoken');
    
//         if (token) {
//           try {
//             // فك تشفير التوكن لاستخراج id
//             const decodedToken: any = jwtDecode(token);
//             const userId = decodedToken.id; // تأكد من أن المفتاح صحيح بناءً على محتوى التوكن
    
//             if (userId) {
//               this.cashPaymentSubmit(userId);
//             } else {
//               console.error('لم يتم العثور على id في التوكن');
//             }
//           } catch (error) {
//             console.error('خطأ في فك تشفير التوكن', error);
//           }
//         } else {
//           console.error('لم يتم العثور على usertoken في localStorage');
//         }
//   }

//   chckoutFormInut() {
//     this.checkoutForms = this.formbuilder.group({
//       details: [
//         null,
//         [
//           Validators.required,
//           Validators.minLength(10),
//           Validators.maxLength(50),
//         ],
//       ],
//       phone: [
//         null,
//         [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)],
//       ],
//       city: [
//         null,
//         [
//           Validators.required,
//           Validators.minLength(3),
//           Validators.maxLength(20),
//         ],
//       ],
//     });
//   }
//   getCartId(): void {
//     this.activatedroute.paramMap.subscribe({
//       next: (param) => {
//         this.cartId = param.get('id')!;
//       },
//     });
//   }

//   submitForm(): void {
//     this.ordersService
//       .checkOutPayment(this.cartId, this.checkoutForms.value)
//       .subscribe({
//         next: (res) => {
//           res.stutus === 'success';
//           open(res.session.url, '_sel');
//         },
//         error: (err) => {},
//       });
//   }

//   cashPaymentSubmit(userId:string):void{
//     this.ordersService
//     .cashOrder(userId)
//     .subscribe({
//       next: (res) => {
//         if(res.stutus === 'success'){
//           this.toastrService.success('done! ', 'Trove!');

//         }
//       },
//       error: (err) => {
     

//       },
//     });

//   }
// }




import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from './../../core/services/orders/orders.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutForms!: FormGroup;
  private readonly formbuilder = inject(FormBuilder);
  private readonly activatedroute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService);
  private readonly toastrService = inject(ToastrService);

  cartId: string = '';
  userId: string = '';  // تخزين ID المستخدم بعد فك التوكن

  ngOnInit(): void {
    this.checkoutFormInit(); 
    this.getCartId();
    this.getUserId(); // استخراج الـ ID من التوكن
  }

  checkoutFormInit() {
    this.checkoutForms = this.formbuilder.group({
      details: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)],
      ],
      city: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  getCartId(): void {
    this.activatedroute.paramMap.subscribe({
      next: (param) => {
        this.cartId = param.get('id')!;
      },
    });
  }

  getUserId(): void {
    const token = localStorage.getItem('usertoken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.userId = decodedToken.id;

        if (!this.userId) {
          console.error('error from token');
        }
      } catch (error) {
        console.error( error);
      }
    } else {
      console.error('لم يتم العثور على usertoken في localStorage');
    }
  }

  submitForm(): void {
    this.ordersService
      .checkOutPayment(this.cartId, this.checkoutForms.value)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            window.open(res.session.url, '_blank');
          }
        },
        error: (err) => {
          this.toastrService.error('eroor');
        },
      });
  }

  cashPaymentSubmit(): void {
    if (!this.userId) {
      return;
    }

    this.ordersService.cashOrder(this.cartId, this.checkoutForms.value).subscribe({
      next: (res) => {
           console.log(res)
          this.toastrService.success('Done  !');
     
      },
      error: (err) => {
        this.toastrService.error('error  !');

      },
    });
  }
}
