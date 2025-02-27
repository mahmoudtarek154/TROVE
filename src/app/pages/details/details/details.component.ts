import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../core/services/products/product.service';
import { Iproducts } from '../../../shared/interfaces/iproducts';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  imports: [TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  detailsproduct: Iproducts | null = null ;

  addItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Trove!');
      },
      error: (err) => {},
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let productId = p.get('id');
        this.productService.getspecificproducts(productId).subscribe({
          next: (res) => {
            this.detailsproduct = res.data;
          },
        });
      },
    });
  }
}
