import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceComponent } from '../bill/invoice/invoice.component';
import { MatDialog } from '@angular/material/dialog';
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
  firstOperand: any = null;
  operator: any = null;
  waitForSecondNumber = false;
  mobileview: any
  todaybillDataList: any = [];
  todaybillDataLlength: any = 0;
  public displayedColumns: any = ['create_date', 'status', 'bill_no'];
  public dataSource: any;
  todayincome: number = 0;
  monthlySalesData: any = [];
  chartOptions3: any
  shopType: any;
  chartOptions2: any
  constructor(public dataService: DataService, public authService: AuthService, public dialog: MatDialog,) {
  }
  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  ngOnInit(): void {
    this.UserId = this.authService.getUserId();
    this.getResgiterDataById();
    this.mobileview = this.dataService.getIsMobileResolution();
    this.getBillData()
    this.shopType = localStorage.getItem('shop_type')
    this.getMonthlydata();
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  } ngAfterViewInit() {

  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  setDataSourceAttributes() {
    if (this.paginator !== undefined && this.sort != undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  getBillData() {
    this.dataService.getBillInfo().subscribe((data) => this.billData(data));
  }

  getMonthlydata() {
    this.dataService.getMonthlyData().subscribe((data) => {
      this.prepareChart(data)
    });
  }

  billData(data: any) {
    data.forEach((valuedata: any) => {
      if (new Date(valuedata.create_date).toDateString() === new Date().toDateString()) {
        this.todaybillDataList.push(valuedata);
      }
      this.dataSource = new MatTableDataSource(this.todaybillDataList);
      this.todaybillDataLlength = this.todaybillDataList.length;
    });
    let sum = 0;
    this.todaybillDataList.forEach((incomedata: any) => {
      sum += parseInt(incomedata.total_bill);
    });
    this.todayincome = sum;
    this.getAllCount();

  }
  getRegisterData(data: any) {
    this.userData = data[0];
    console.log(this.userData);
    this.dataService.userData = this.userData;
  }
  getAllCount(): void {
    this.dataService.getallcount().subscribe((data) => this.countdata(data),
      (err: Error) => console.log(err));
  }
  countdata(data: any) {
    this.countData = data.data;
    let countDataList: any = []
    countDataList.push(
      { name: "Total Bill", y: this.countData[0].billCount },
      { name: "Total Customer", y: this.countData[0].customercount },
      { name: "Today Income", y: this.todayincome },
      { name: "Today Bill", y: this.todaybillDataLlength }
    )
    this.chartOptions3function(countDataList)
  }


  prepareChart(data: any) {
    this.chartOptions2 = {
      title: {
        text: 'Monthly Sales Data',
      },
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      axisY: {
        includeZero: true,
        valueFormatString: '#,##0 ₹',
      },
      data: [
        {
          type: 'column', //change type to bar, line, area, pie, etc
          yValueFormatString: '#,##0 ₹',
          color: '#01b8aa',
          dataPoints: data,
        },
      ],
    };
  }

  chartOptions3function(countDataList: any) {
    console.log(countDataList)
    this.chartOptions3 = {
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Total Counts"
      },
      // subtitles: [{
      //   text: "Total Counts"
      // }],
      data: [{
        type: "pie", //change type to column, line, area, doughnut, etc
        indexLabel: "{name}: {y}",
        dataPoints: countDataList
      }]
    }
  }


  getResgiterDataById() {
    this.dataService.getAdminProfileDataById(this.UserId)
      .subscribe(
        (data: any) => this.getRegisterData(data),
      )
  }



  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
  downloadInvoice(id: any) {
    let invoicedata = {
      order: id,
      billcounter: true, bill: 'counter'
    };
    const dialogRef = this.dialog.open(InvoiceComponent, {
      autoFocus: false,
      panelClass: 'my-full-screen-dialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: invoicedata,
    });
    dialogRef.afterClosed().subscribe((result: any) => { });
  }

}
