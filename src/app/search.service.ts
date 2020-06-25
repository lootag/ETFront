import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private url: string = 'https://edgartools.azurewebsites.net/api/download';
  constructor(private _http: HttpClient) { }

  downloadFile(filename: string = null, userData): void
  {

    const token = localStorage.getItem("access_token")
    const headers = new HttpHeaders().set('authorization','Bearer '+ token);
    this._http.post(this.url, userData, {headers, responseType: 'blob' as 'json'}).subscribe
    (
      (response: any) =>
      {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
            downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }

  request(userData)
  {
    var headersObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("access_token"));
    return this._http.post<any>(this.url, userData, {headers: headersObject, responseType: 'blob' as 'json'});
  }

}
