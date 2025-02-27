import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from './../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselModule, TranslatePipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  custommainOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    rtl: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-regular fa-hand-point-left"></i>',
      '<i class="fa-regular fa-hand-point-right"></i>',
    ],
    items: 1,
    nav: true,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    rtl: true,

    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: [
      '<i class="fa-regular fa-hand-point-left"></i>',
      '<i class="fa-regular fa-hand-point-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  private readonly productService = inject(ProductService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  products: Iproducts[] = [];
  Categories: ICategories[] = [];
  wishlistItems: string[] = [];
  wishItem: any;

  getprouductdata(): void {
    this.productService.getproducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getEnabledCategories(): void {
    this.categoriesService.getcategories().subscribe({
      next: (res) => {
        this.Categories = res.data;
      },
      error: (err) => {},
    });
  }

  addItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Trove!');
      },
      error: (err) => {},
    });
  }

  getWishlistData(): void {
    this.wishlistService.getLoggedWishList().subscribe({
      next: (res) => {
        this.wishlistItems = res.data.map((item: any) => item._id);
      },
    });
  }

  addItemToWishlist(id: string, event: Event): void {
    const heartIcon = event.currentTarget as HTMLElement;

    if (this.wishlistItems.includes(id)) {
      this.wishlistService.removeItemFromWishlist(id).subscribe({
        next: () => {
          this.toastrService.info('Removed from Wish List', 'Trove!');
          this.wishlistItems = this.wishlistItems.filter((item) => item !== id);
        },
        error: (err) => console.log(err),
      });
    } else {
      this.wishlistService.addProductToWishlist(id).subscribe({
        next: () => {
          this.toastrService.success('Added to Wish List', 'Trove!');
          this.wishlistItems.push(id);
        },
        error: (err) => console.log(err),
      });
    }
  }

  ngOnInit(): void {
    this.getprouductdata();
    this.getEnabledCategories();
    this.getWishlistData();
  }
}
