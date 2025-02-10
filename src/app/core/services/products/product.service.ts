import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpclient: HttpClient) {}

  getproducts(): Observable<any> {
    return this.httpclient.get(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }
  getspecificproducts(id: string): Observable<any> {
    return this.httpclient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
}
