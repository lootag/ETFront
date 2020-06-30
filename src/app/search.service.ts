import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FilingResponse } from './FilingResponse';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiData = new BehaviorSubject<Array<FilingResponse>>(new Array<FilingResponse>());
  public apiData$ = this.apiData.asObservable();
  private url: string = 'https://edgartools.azurewebsites.net/api/search';
  constructor(private _http: HttpClient) { }



  request(userData)
  {
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"));
    return this._http.post<any>(this.url, userData, {headers: headersObject});
  }

  setData(data)
  {
    this.apiData.next(data);
  }

}
