import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CikService {

  constructor(private _http: HttpClient) { }
  private url: string = "https://edgartools2.azurewebsites.net/api/getCiks"
  request()
  {
    return this._http.get<any>(this.url);
  }

}
