import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  planInfo(plan:any,price:any){

    this.router.navigate(['/payment'], { queryParams: { plan: plan, price:price } });
  }
}
