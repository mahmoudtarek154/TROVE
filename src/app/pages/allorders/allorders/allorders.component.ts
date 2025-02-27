




import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from './../../../core/services/orders/orders.service';
import { jwtDecode } from "jwt-decode";
import { Root2 } from '../../../shared/interfaces/allorders';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  imports: [TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  private readonly ordersService = inject(OrdersService);
  orders: Root2[] = [];

  getAllOrdersData(id: string): void {
    this.ordersService.getAllOrders(id).subscribe({
      next: (res) => {
        console.log(res);
        this.orders = res;
      }
    });
  }

  ngOnInit(): void {
    // جلب التوكن من localStorage
    const token = localStorage.getItem('usertoken');

    if (token) {
      try {
        // فك تشفير التوكن لاستخراج id
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.id; // تأكد من أن المفتاح صحيح بناءً على محتوى التوكن

        if (userId) {
          this.getAllOrdersData(userId);
        } else {
          console.error('لم يتم العثور على id في التوكن');
        }
      } catch (error) {
        console.error('خطأ في فك تشفير التوكن', error);
      }
    } else {
      console.error('لم يتم العثور على usertoken في localStorage');
    }
  }
}
