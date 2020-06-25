import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router) { }
  rows =
  [
    { Company: 'Apple', Filing: '10-K', Item: 'Business', Date: '2019-01-01' },
    { Company: 'Apple', Filing: '10-K', Item: 'Business', Date: '2019-02-01' }

  ];

  columns =
  [
    {prop: 'Company'},
    {name: 'Filing'},
    {name: 'Item'},
    {name: 'Date'}
  ];

  ngOnInit(): void
  {
    if(localStorage.getItem("access_token") == null)
    {
      this.router.navigate(["login"])
    }
  }

}
