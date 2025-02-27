import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/categories';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

 

  private readonly categoriesService = inject(CategoriesService);
  Categories: ICategories[] = [];
  getEnabledCategories(): void {
    this.categoriesService.getcategories().subscribe({
      next: (res) => {
        this.Categories = res.data;
      },
      error: (err) => {
      },
    });

  
    
  }


  ngOnInit(): void {
    this.getEnabledCategories();
  }
  
}
