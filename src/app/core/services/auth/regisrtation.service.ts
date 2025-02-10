import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface UserLoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisrtationService {
  userdata: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {}

  sendregisterdata(data: object): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }
  sendlogindata(data: UserLoginPayload): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }

  savedata() {
    this.userdata.next(
      jwtDecode(JSON.stringify(localStorage.getItem('usertoken')))
    );
  }
}
