import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchService } from '../search.service';
import { DownloadService } from '../download.service';
import { FilingResponse } from '../FilingResponse';
import { DownloadRequest } from '../DownloadRequest';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router, private ss: SearchService, private ds: DownloadService)
  {
    ss.apiData$.subscribe(data => this.dataSource = data);
  }

  dataSource: Array<FilingResponse> = [];
  settings = {
    columns: {
      company: {
        title: 'Company',
        editable: false,
      },
      filing: {
        title: 'Filing Type',
        editable: false
      },
      item: {
        title: 'Item',
        editable: false
      },
      date: {
        title: 'Date Filed',
        editable: false
      }
    },
    actions: {
      edit: false,
      add: false,

    },
    pager: {
      display: true,
      perPage: 10
    },

  };

  data = [];



  ngOnInit(): void
  {
    console.log("The response is " + this.dataSource[0].company);
    if(localStorage.getItem("access_token") == null)
    {
      this.router.navigate(["login"]);
    }

    let filingMap = new Map();
    filingMap.set("tenK", "10-K");
    filingMap.set("eightK", "8-K");
    filingMap.set("defFourteen", "DEF-14")
    for(var i = 0; i < this.dataSource.length; i++)
    {
      this.data.push({company : this.dataSource[i].company, filing: filingMap.get(this.dataSource[i].filingReadable),
                      item: this.dataSource[i].itemReadable, date: this.dataSource[i].dateFiled.substring(0,10)})
    }
  }

  onSubmit()
  {
    let downloadRequest: DownloadRequest = new DownloadRequest();
    let userData: Array<string> = [];
    for(var i = 0; i < this.dataSource.length; i++)
    {
      userData.push(this.dataSource[i].fileName);
    }
    downloadRequest.Names = userData;
    this.ds.downloadFile("Filings.zip", downloadRequest);
    this.router.navigate(["loader"]);
  }



}
