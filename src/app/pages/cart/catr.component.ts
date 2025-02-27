import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from './../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-cart',
  imports: [RouterLink , TranslatePipe],
  templateUrl: './catr.component.html',
  styleUrl: './catr.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
    private readonly toastrService = inject(ToastrService);
  

  cartDetails: Icart = {} as Icart;
  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.cartService.getLoggeduserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
      error: (err) => {},
    });
  }

  removeProductFromCart(id: string): void {
    this.cartService.removeItemFromCart(id).subscribe({
      next: (res) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#248888",
          cancelButtonColor: "#e7475e",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.cartDetails = res.data;
            this.toastrService.success('Remove Successfully!', 'Trove!');
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });



          }
        });
      },
      error: (err) => {},
    });
  }

  updateCartCount(id: string, cartCount: number): void {
    this.cartService.updateItemCount(id, cartCount).subscribe({
      next: (res) => {

      },
    });
  }
  clearDataFromCart() {
    this.cartService.deletCart().subscribe({
      next: (res) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#248888",
          cancelButtonColor: "#e7475e",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.cartDetails = {} as Icart;

            this.cartDetails = res.data;
            this.toastrService.success('Cart is empty!', 'Trove!');
            this.getCartData()
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
          
            });
       


          }
        });

      },
    });
  }
}
