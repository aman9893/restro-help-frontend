import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';
import ZingchartAngular from 'zingchart-angular/zingchart';
import zingchart from 'zingchart-angular/zingchart';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  countData: any;
  userData: any;
  UserId: any;

  constructor(public dataService:DataService,public authService:AuthService,) { }
  config: ZingchartAngular.graphset = {
    type: 'line',
    series: [{
      values: [3,6,4,6,4,6,4,6]
    }],
  };
  ngOnInit(): void {
    this.getAllCount();
    this.UserId = this.authService.getUserId();
    this.getResgiterDataById();
    const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((navItem, i) => {
  navItem.addEventListener("click", () => {
    navItems.forEach((item, j) => {
      item.className = "nav-item";
    });
    navItem.className = "nav-item active";
  });
});
  }
  getResgiterDataById() {
    this.dataService.getAdminProfileDataById(this.UserId)
      .subscribe(
        data => this.getRegisterData(data),
      )
  }

  getRegisterData(data:any) {
     this.userData = data[0];
     console.log(this.userData);
     this.dataService.userData = this.userData;
  }
  getAllCount(): void {
    this.dataService.getallcount().subscribe((data) => this.countdata(data),
    (err: Error) => console.log(err));
  }
  countdata(data: any) { 
    this.countData= data.data;
    console.log(this.countData)

}



}
