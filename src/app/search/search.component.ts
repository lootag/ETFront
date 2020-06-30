import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SearchService } from '../search.service';
import { CikService } from '../cik.service';
import { FilingRequest } from './FilingRequest';
import { Router } from '@angular/router';
import { FilingResponse } from '../FilingResponse';
import { timer } from 'rxjs';


declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  constructor(private fb: FormBuilder, private ss: SearchService, private ciks: CikService, private router: Router) { }
  dropdownList: Array<any> = [];
  selectedItems: Array<any> = [];
  dropdownSettings: any = {};
  dropdownListCiks: Array<any> = [];
  selectedItemsCiks: Array<any> = [];
  filingsResponse: Array<FilingResponse> = [];
  ngOnInit()
  {


    if(localStorage.getItem("loginAttempted") != null && localStorage.getItem("access_token") == null)
    {
      console.log("invalid credentials");
      this.router.navigate(["loginerror"]);
    }
    if(localStorage.getItem("loginAttempted") == null)
    {
      console.log("you haven't logged in");
      this.router.navigate(["login"]);
    }
    console.log("The access token is " + localStorage.getItem("access_token"));
    if(localStorage.getItem("access_token") != null)
    {
      let ciksRequested: Array<any> = [];
      this.ciks.request().subscribe
      (
        res =>
        {
          localStorage.setItem("ciks", JSON.stringify(res.ciks));
        },
        err =>
        {
          location.reload();
        }
      )

      var myCiks = JSON.parse(localStorage.getItem("ciks"));
      localStorage.removeItem("ciks");
      for(var i = 0; i < myCiks.length; i++)
      {
        ciksRequested.push({item_id: i+1, item_text: myCiks[i]})
      }
      this.dropdownList = [
      ];
      this.dropdownSettings= {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1000,
        allowSearchFilter: true
      };


      this.dropdownListCiks = ciksRequested;
    }


    this.searchForm = this.fb.group({
      CIKS: ['', [
        Validators.required
      ]],
      DateStart: ['',[
        Validators.required
      ]],
      DateEnd: ['',[
        Validators.required
      ]],
      allFilings: ['',[
        Validators.required
      ]],
      tenK: ['',[
        Validators.required
      ]],
      eightK: ['',[
        Validators.required
      ]],
      defFourteen: ['',[
        Validators.required
      ]],
      Items:[this.selectedItems,[
        Validators.required
      ]]

    });

    this.generateYears();
    this.generateMonths();
    this.allFilingsChecked = false;
    this.tenKChecked = false;
    this.eightKChecked = false;
    this.defFourteenChecked = false;
    this.searchForm.patchValue({allFilings: false, tenK: false, eightK: false, defFourteen: false});
    this._items = ["All items"];

  }

  get CIKS()
  {
    return this.searchForm.get('CIKS');
  }

  get DateStart()
  {
    return this.searchForm.get('DateStart');
  }

  get DateEnd()
  {
    return this.searchForm.get('DateEnd');
  }


  get allFilings()
  {
    return this.searchForm.get('allFilings');
  }

  get tenK()
  {
    return this.searchForm.get('tenK');
  }

  get eightK()
  {
    return this.searchForm.get('eightK');
  }

  get defFourteen()
  {
    return this.searchForm.get('defFourteen');
  }

  get Items()
  {
    return this.searchForm.get('Items');
  }


  allFilingsChecked: boolean;
  tenKChecked: boolean;
  eightKChecked: boolean;
  defFourteenChecked: boolean;


  Years: number[] = [];
  Months: number[];

  _items: string[];



  allFilingsChange(e: boolean) : void
  {

    console.log("allFilings was" + this.allFilingsChecked);
    this.allFilingsChecked = !this.allFilingsChecked;
    console.log("now allFilings is" + this.allFilingsChecked)
    if(this.allFilingsChecked)
    {
      let tmp = this.tenKItems.concat(this.eightKItems).concat(this.def14Items);
      this.dropdownList = tmp;
    }
    else
    {
      let tmp = [];
      this.dropdownList = tmp;

    }
  }

  tenKItems: string[] = ["Business", "Properties", "Legal Proceedings",
                               "Mine Safety Disclosures", "Market", "Consolidated Financial Data",
                               "MDNA", "Financial Statements", "Changes in and Disagreements With Accountants on Accounting and Financial Disclosure",
                               "Directors, Executive Officers and Corporate Governance", "Executive Compensation",
                               "Security Ownership of Certain Beneficial Owners and Management and Related Stockholder Matters",
                               "Certain Relationships and Related Transactions, and Director Independence",
                               "Principal Accounting Fees and Services",
                               "Exhibits, Financial Statement Schedules Signatures"];
  eightKItems: string[] = ["Registrant's Business and Operations", "Financial Information",
                            "Securities and Trading Markets", "Matters Related to Accountants and Financial Statements",
                           "Corporate Governance and Management", "Asset-Backed Securities", "Regulation FD", "Other Events",
                           "Financial Statements and Exhibits"];
  def14Items: string[] = [];




  TenKChange(e: boolean) : void
  {
    this.tenKChecked = !this.tenKChecked;
    if(this.tenKChecked && !this.allFilingsChecked)
    {
      console.log("indeed, I'm crazy.")
      let tmp = [];
      tmp = tmp.concat(this.dropdownList);
      for(var i = 0; i < this.tenKItems.length; i++)
      {
        let ids: number[] = this.dropdownList.filter(item => item.item_id);
        let max = Math.max(Math.max(...ids) + 1,1);
        console.log(max);
        tmp.push(
          {item_id: max + i, item_text: this.tenKItems[i]}
        )
      }
      this.dropdownList = tmp;
    }
    else if(!this.allFilingsChecked)
    {
      console.log("Indeed, I'm not");
      let tmp = this.dropdownList.filter(item => !this.tenKItems.includes(item.item_text));
      this.dropdownList = tmp;
    }
  }



  EightKChange(e: boolean) : void
  {
    this.eightKChecked = !this.eightKChecked;
    if(this.eightKChecked && !this.allFilingsChecked)
    {
      let tmp = [];
      tmp = tmp.concat(this.dropdownList);
      for(var i = 0; i < this.eightKItems.length; i++)
      {
        let ids: number[] = this.dropdownList.filter(item => item.item_id);
        let max = Math.max(...ids) + 1;
        tmp.push(
          {item_id: max + i, item_text: this.eightKItems[i]}
        )
      }
      this.dropdownList = tmp;
    }
    else if(!this.allFilingsChecked)
    {
      let tmp = this.dropdownList.filter(item => !this.eightKItems.includes(item.item_text));
      this.dropdownList = tmp;
    }
  }

  DefFourteenChange(e: boolean) : void
  {
    this.defFourteenChecked = !this.defFourteenChecked;
    if(this.defFourteenChecked && !this.allFilingsChecked)
    {
      let tmp = [];
      tmp = tmp.concat(this.dropdownList);
      for(var i = 0; i < this.def14Items.length; i++)
      {
        let ids: number[] = this.dropdownList.filter(item => item.item_id);
        let max = Math.max(...ids) + 1;
        tmp.push(
          {item_id: max + i, item_text: this.def14Items[i]}
        )
      }
      this.dropdownList = tmp;
    }
    else if(!this.allFilingsChecked)
    {
      let tmp = this.dropdownList.filter(item => !this.def14Items.includes(item.item_text));
      this.dropdownList = tmp;
    }
  }

  generateYears(): void
  {
    let toReturn: number[] = [];
    for(var i = 1960; i <= 2020; i++)
    {
      toReturn.push(i);
    }
    this.Years = toReturn;

  }

  generateMonths(): void
  {
    let toReturn: number[] = [];
    for(var i = 1; i <= 12; i++)
    {
      toReturn.push(i);
    }
    this.Months = toReturn;

  }

  unique(value, index, self)
  {
    return self.indexOf(value) === index;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }








  onSubmit()
  {
    let itemsMap = new Map();
    let allItems: Array<string> = this.tenKItems.concat(["Full10K"]).concat(this.eightKItems).concat(["Full8K"]);
    for(var i = 0; i < allItems.length; i++)
    {
      itemsMap.set(allItems[i], i);
    }
    console.log(itemsMap);
    let filingRequest: FilingRequest = new FilingRequest();
    let ciksList =  this.searchForm.get("CIKS").value;
    filingRequest.CIKS = [];
    for(var i = 0; i < ciksList.length; i++)
    {
      filingRequest.CIKS.push(ciksList[i].item_text);
    }
    filingRequest.DateStart = String(this.DateStart.value.year) + "-" +  String(this.DateStart.value.month).padStart(2, '0') + "-" + String(this.DateStart.value.day).padStart(2, '0');
    filingRequest.DateEnd = String(this.DateEnd.value.year) + "-" + String(this.DateEnd.value.month).padStart(2, '0') + "-" + String(this.DateEnd.value.day).padStart(2, '0');
    filingRequest.Filings = [];
    if(this.allFilings.value)
    {
      filingRequest.Filings.push(5);
    }
    else
    {
      if(this.tenK.value)
      {
        filingRequest.Filings.push(0);
      }

      if(this.eightK.value)
      {
        filingRequest.Filings.push(1);
      }
      if(this.defFourteen.value)
      {
        filingRequest.Filings.push(2);
      }
    }
    let itemsList: Array<string> = [];
    for(var i = 0; i < this.Items.value.length; i++)
    {
      itemsList.push(this.Items.value[i].item_text);
    }
    filingRequest.Items = [];
    if(this.arrayIncludes(itemsList, this.tenKItems))
    {

      console.log("There's all 10K items");
      filingRequest.Items.push(itemsMap.get("Full10K"));
      itemsList = itemsList.filter(item => !this.tenKItems.includes(item));
    }
    if(this.arrayIncludes(itemsList, this.eightKItems))
    {
      console.log("There's all 8K items");
      filingRequest.Items.push(itemsMap.get("Full8K"));
      itemsList = itemsList.filter(item => !this.eightKItems.includes(item));
    }
    for(var i = 0; i < itemsList.length; i ++)
    {
      filingRequest.Items.push(itemsMap.get(itemsList[i]));
    }

    console.log(itemsList);
    console.log(filingRequest);
    console.log(this.Items.value);
    this.ss.request(filingRequest).subscribe
    (
      data =>
      {
        this.filingsResponse = data.filings;
        this.ss.setData(this.filingsResponse);
        console.log(this.filingsResponse);
        this.router.navigate(["checkout"]);
      },
      err =>
      {
        this.router.navigate(["nofilings"]);
      }
    );

    this.router.navigate(["loader"]);

  }

  arrayIncludes(a: Array<any>, b: Array<any>): boolean
  {
    for(var i = 0; i < b.length; i++)
    {
      if(!a.includes(b[i]))
      {
        return false;
      }
    }
    return true;
  }

  ngOnDestroy()
  {

  }


}

