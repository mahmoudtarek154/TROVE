import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private httpClient:HttpClient) { }
  userToken: any = localStorage.getItem('usertoken');


  checkOutPayment(id:string,data:object):Observable<any>{

    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress":data
    }
    
    )
  }


  getAllOrders( id: string ):Observable<any>{

    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      
    )
  }
  cashOrder( id: string ,data:object):Observable<any>{

    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,
      {
        "shippingAddress":data
    }
    )
  }
  


 
  
}
