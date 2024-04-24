
import { DataService } from 'src/app/data-service/data.service';
import { MyauthService } from 'src/app/protected-component/Hr-Adminside/AuthDataService/authservice';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/data-service/event-service';
import { WindowService } from 'src/app/data-service/window.service';
@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],

})
export class AddPaymentComponent implements OnInit, OnDestroy {

  user_id: any;
  newUpdateDate: any;
  trialdays: number;
  private sub: any;
  plan: any;
  planTime: any;
  price: any;
  Trialdays: any;
  paybox: any;
  handler:any = null;
  userData: any;
  
  constructor(private eventService: EventService,private winRef: WindowService,
     private routes: ActivatedRoute,
     public dataService: DataService, 
     private authService: MyauthService, private route: Router) { }
  
  ngOnInit() {
    this.sub = this.routes.queryParams.subscribe(params => {
      this.plan = params['plan'];
      this.price = params['price'];// (+) converts string 'id' to a number
    });
    let UserId = this.authService.getUserId();
    this.user_id = UserId;
      this.dataService.getAdminProfileDataById(UserId)
        .subscribe(
          data => this.getRegisterData(data),
        )
    this.loadStripe();
    this.planTime = 0;
  }

  getRegisterData(data) {
    this.userData = data[0];
    this.Trialdays = this.userData.trial_days
 
 }

  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
}

  paymentSuccessfully(value) {
    if (value == 30) {
      this.trialdays = 30 + this.Trialdays;
    }
    if (value == 180) {
      this.trialdays = 180 + this.Trialdays;
    }
    if (value == 360) {
      this.trialdays = 360 + this.Trialdays;
    }
    let data = {
      id: this.user_id,
      user_expiry_date: new Date(),
      trial_days: this.trialdays
    }
    this.dataService.updateTrialDays(data)
      .subscribe(
        data => this.getPricedataList(data),
      )
  }

  getPricedataList(data) {
    this.dataService.openSnackBar(data.message, 'Dismiss');
    this.route.navigate(["/login"]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  payWithRazor(payAmount,plan){ 
    console.log(payAmount,plan)
    this.planTime = plan;
    let options:any = {
        "key": "rzp_test_y9we2su8tZBZob",
        "amount": payAmount * 100,
        "name": "Shop Mart 360",
        "description": "Active Paln",
        "image": "./assets/images/Storelogin.jpg",
        "modal": {
          "escape": false
        }, 
        "prefill": {
          "name":  this.userData.name,
          "contact": this.userData.phone_number,
          "email": this.userData.email,
          // "method": 'card',
          // 'card[number]': finalObj.cardDetail.cardNumber,
          // 'card[expiry]': finalObj.cardDetail.cardExpDate,
          // 'card[cvv]': finalObj.cardDetail.cardCvv
        },
        "notes": {
          "address":this.userData.shop_address
        },
        "theme": {
          "color": "#6fbc29"
        }
      };
      options.handler = ((response:any) => {
          console.log(response)
           let payment_response_id = response.razorpay_payment_id;
           if(payment_response_id){
              this.paymentSuccessfully(this.planTime)
           }
          //\\ this.paymentService.payWithRazor({cart: finalObj, payment: options});
      });
      options.modal.ondismiss = (() => {
          // this.loginService.SetLoader = false;
      });
      let rzp = new this.winRef.nativeWindow.Razorpay(options);
      rzp.open();
   }
}

