import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private httpClient:HttpClient) { }
  getcategories():Observable<any>{

    return this.httpClient.get(environment.baseUrl+'/api/v1/categories')

  }
  getspecificcategories(id:string):Observable<any>{

    return this.httpClient.get(environment.baseUrl+`/api/v1/products/${id}`)

  }

 
}
