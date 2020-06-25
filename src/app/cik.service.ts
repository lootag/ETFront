import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CikService {

  constructor(private _http: HttpClient) { }
  private url: string = "https://edgartools.azurewebsites.net/api/getCiks"
  request()
  {
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"));
    return this._http.post<any>(this.url, null, {headers: headersObject});
  }

}
