import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private url: string = 'https://edgartools.azurewebsites.net/api/login';
  constructor(private _http: HttpClient) { }

  request(userData)
  {
    return this._http.post<any>(this.url, userData);
  }
}
