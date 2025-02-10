import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private httpClient:HttpClient) { }
  getcategories():Observable<any>{

    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/categories')

  }
  getspecificcategories(id:string):Observable<any>{

    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

  }
}
