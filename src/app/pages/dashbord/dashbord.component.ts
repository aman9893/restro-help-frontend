import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  countData: any;
  userData: any;
  UserId: any;
  currentNumber = '0';
  firstOperand :any= null;
  operator :any= null;
  waitForSecondNumber = false;
  mobileview:any

  constructor(public dataService:DataService,public authService:AuthService,) { }

  ngOnInit(): void {
    this.getAllCount();
    this.UserId = this.authService.getUserId();
    this.getResgiterDataById();
  this. mobileview = this.dataService.getIsMobileResolution();
  }
  chartOptions = {
    title: {
      text: "Basic Column Chart in Angular"
    },
    data: [{
      type: "column",
      dataPoints: [
      { label: "Apple",  y: 10  },
      { label: "Orange", y: 15  },
      { label: "Banana", y: 25  },
      { label: "Mango",  y: 30  },
      { label: "Grape",  y: 28  }
      ]
    }]                
    };

    chartOptions2 = {
      title: {
        text: 'Monthly Sales Data',
      },
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      axisY: {
        includeZero: true,
        valueFormatString: '$#,##0k',
      },
      data: [
        {
          type: 'column', //change type to bar, line, area, pie, etc
          yValueFormatString: '$#,##0k',
          color: '#01b8aa',
          dataPoints: [
            { label: 'Jan', y: 172 },
            { label: 'Feb', y: 189 },
            { label: 'Mar', y: 201 },
            { label: 'Apr', y: 240 },
            { label: 'May', y: 166 },
            { label: 'Jun', y: 196 },
            { label: 'Jul', y: 218 },
            { label: 'Aug', y: 167 },
            { label: 'Sep', y: 175 },
            { label: 'Oct', y: 152 },
            { label: 'Nov', y: 156 },
            { label: 'Dec', y: 164 },
          ],
        },
      ],
    };
    chartOptions3= {
      animationEnabled: true,
      theme: "dark2",
      exportEnabled: true,
      title: {
        text: "Developer Work Week"
      },
      subtitles: [{
        text: "Median hours/week"
      }],
      data: [{
        type: "pie", //change type to column, line, area, doughnut, etc
        indexLabel: "{name}: {y}%",
        dataPoints: [
          { name: "Overhead", y: 9.1 },
          { name: "Problem Solving", y: 3.7 },
          { name: "Debugging", y: 36.4 },
          { name: "Writing Code", y: 30.7 },
          { name: "Firefighting", y: 20.1 }
        ]
      }]
    }
  getResgiterDataById() {
    this.dataService.getAdminProfileDataById(this.UserId)
      .subscribe(
        (data:any) => this.getRegisterData(data),
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


public clear(){
  this.currentNumber = '0';
  this.firstOperand = null;
  this.operator = null;
  this.waitForSecondNumber = false;
}


}
