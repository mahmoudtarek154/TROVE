import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpclient: HttpClient) {}

  getBrands(): Observable<any> {
    return this.httpclient.get(
      environment.baseUrl+'/api/v1/brands'
    );
  }
  getSpecificBrands(id: string| null): Observable<any> {
    return this.httpclient.get(
      environment.baseUrl+`/api/v1/brands/${id}`
    );
  }
  
}
