import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  userToken: any = localStorage.getItem('usertoken');

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl+'/api/v1/cart',

      {
        productId: id,
      }
    );
  }

  getLoggeduserCart():Observable<any>{

    return this.httpClient.get(environment.baseUrl+'/api/v1/cart',
      {
        headers:{
          token:this.userToken
        }
      }
    )
  }

  removeItemFromCart(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/api/v1/cart/${id}`,
      {
        headers:{
          token:this.userToken
        }
      }
    )
  }
  updateItemCount(id:string, newCount:number):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/api/v1/cart/${id}`,
      {
        "count": newCount
    },
    {
      headers:{
      token: this.userToken
    }}
    )
  }
  deletCart():Observable<any>{

    return this.httpClient.delete(environment.baseUrl+'/api/v1/cart',
      {
        headers:{
          token: this.userToken
        }
      }
    )
  }
}
