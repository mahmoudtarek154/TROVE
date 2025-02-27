import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpclient: HttpClient) {}

  getproducts(): Observable<any> {
    return this.httpclient.get(
      environment.baseUrl+'/api/v1/products'
    );
  }
  getspecificproducts(id: string| null): Observable<any> {
    return this.httpclient.get(
      environment.baseUrl+`/api/v1/products/${id}`
    );
  }
}
