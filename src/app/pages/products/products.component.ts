

import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { CartService } from './../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [TranslatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  products: Iproducts[] = []; 
  filteredProducts: Iproducts[] = []; 

  productForms: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  getProductData(): void {
    this.productService.getproducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.filteredProducts = res.data; 

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getProductData();

    this.productForms.get('search')?.valueChanges.subscribe((value) => {
      this.filterProducts(value);
    });
  }

  addItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Trove!');
      },
    });
  }

 

  filterProducts(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredProducts = this.products; 
    } else {
      const lowerCaseTerm = searchTerm.toLowerCase();
      this.filteredProducts = this.products.filter((product) =>
        product.title.split(" ", 2).join(" ").toLowerCase().includes(lowerCaseTerm) 
      );
    }
  }
  
}
