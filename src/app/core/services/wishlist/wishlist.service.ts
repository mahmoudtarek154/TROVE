import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient: HttpClient) { }

  userToken: any = localStorage.getItem('usertoken');



    addProductToWishlist(id: string): Observable<any> {
      return this.httpClient.post(
        environment.baseUrl+'/api/v1/wishlist',
        
  
        {
          productId: id,
        }
      );
    }



    
  removeItemFromWishlist(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/api/v1/wishlist/${id}`,
      {
        headers:{
          token:this.userToken
        }
      }
    )
  }




  
  getLoggedWishList():Observable<any>{

    return this.httpClient.get(environment.baseUrl+'/api/v1/wishlist',
      {
        headers:{
          token:this.userToken
        }
      }
    )
  }
}
