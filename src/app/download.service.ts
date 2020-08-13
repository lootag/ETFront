import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private url: string = 'https://edgartools2.azurewebsites.net/api/download';
  constructor(private _http: HttpClient, private router: Router) { }

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
        this.router.navigate(["thanks"]);
      }
    )
  }
}
