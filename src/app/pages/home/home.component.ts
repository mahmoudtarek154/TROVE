import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { Iproducts } from '../../shared/interfaces/iproducts';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  custommainOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-regular fa-hand-point-left"></i>', '<i class="fa-regular fa-hand-point-right"></i>'],
    items:1,
    nav: true
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['<i class="fa-regular fa-hand-point-left"></i>', '<i class="fa-regular fa-hand-point-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  private readonly productService = inject(ProductService);
  private readonly categoriesService = inject(CategoriesService);

  products: Iproducts[] = [];
  Categories : ICategories[]=[];

  getprouductdata(): void {
    this.productService.getproducts().subscribe({
      next: (res) => {
        this.products = res.data
      },
      error: (err) => {
        console.log(err)

      },
    });
  }
  getEnabledCategories():void{

    this.categoriesService.getcategories().subscribe({

      next:(res)=>{
        this.Categories = res.data
console.log(res.data)
      },
      error:(err)=> {
        
      },
    })
  }
  ngOnInit(): void {
    this.getprouductdata();
    this.getEnabledCategories()
  }
}
