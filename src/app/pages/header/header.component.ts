import { Component, OnInit } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  UserId: any;
  userData: any;

  constructor(public authService:AuthService,public router: Router,  public dataService :DataService) { }

  ngOnInit(): void {
    this.UserId = this.authService.getUserId();
    this.getResgiterDataById();
  }

  getResgiterDataById() {
    this.dataService.getAdminProfileDataById(this.UserId)
      .subscribe(
        data => this.getRegisterData(data),
      )
  }

  getRegisterData(data:any) {
     this.userData = data[0];
     console.log(this.userData)
  }
  logout(){
    this.authService.logout();
  }
}
