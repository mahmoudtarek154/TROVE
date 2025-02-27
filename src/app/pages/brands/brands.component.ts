
import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from './../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/brands';
import { TranslatePipe } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brands: IBrands[] = []; 
  filteredBrands: IBrands[] = []; 

  brandsForms: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  getBrandsdata(): void {
    this.brandsService.getBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
        this.filteredBrands = res.data; 
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this.getBrandsdata();

    this.brandsForms.get('search')?.valueChanges.subscribe((value) => {
      this.filterBrands(value);
    });
  }

  filterBrands(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredBrands = this.brands; 
    } else {
      const lowerCaseTerm = searchTerm.toLowerCase();
      this.filteredBrands = this.brands.filter((brand) =>
        brand.name.toLowerCase().includes(lowerCaseTerm)
      );
    }
  }
}
