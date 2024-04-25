import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddKhataComponent } from '../add-khata/add-khata.component';
import { AddkhataAmtComponent } from '../addkhata-amt/addkhata-amt.component';
// import 'jspdf-autotable';
import { MoreHisabComponent } from '../more-hisab/more-hisab.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/auth.service';
import { ConfrimBoxComponent } from '../../confrim-box/confrim-box.component';
@Component({
  selector: 'app-list-khata',
  templateUrl: './list-khata.component.html',
  styleUrls: ['./list-khata.component.css']
})
export class ListKhataComponent implements OnInit {
  searchedKeyword:any
  khataItemlist: any;
  showDataLoader: boolean = true
  totalSum!: number;
  TotalValueDenaHai: any;
  TotalValueLenaHai: any;
  totalSumvalue!: number;
  searchView: boolean = false;
  khataAmountItemlist: any;
  company_name: any;
  shop_address: any;
  shopphone_number: any;
  userDataList: any;
  email: any;

  constructor(public dialog: MatDialog,
    public router: Router,
    public dataService: DataService, private authService: AuthService) { }
  public displayedColumns = ["customer_name", "customer_number", "action"]

  showSearchView() {
    this.searchView = !this.searchView;
  }

  ngOnInit() {
    this.getkhataItem();
  }

  getkhataItem() {
    this.dataService.getKhatalist()
      .subscribe(
        data => this.khataItemData(data),
      )
  }
  khataItemData(data: Object) {
    this.khataItemlist = data;
    this.showDataLoader = false;

  }
  getkhatamountItem(id: any) {
    this.dataService.getKhataAmountlist(id)
      .subscribe(
        data => this.khataAmountItemData(data),
      )
  }
  khataAmountItemData(data: Object) {
    if(data){
      var debitsum = 0;
      var creditsum = 0;
      this.TotalValueDenaHai = '';
      this.TotalValueLenaHai = '';
      this.khataAmountItemlist = data;
      this.showDataLoader = false;
      if (this.khataAmountItemlist.length > 0) {
        for (let index = 0; index < this.khataAmountItemlist.length; index++) {
          if (this.khataAmountItemlist[index].amount_status == 2) {
            debitsum += parseInt(this.khataAmountItemlist[index].amount);
          }
          else {
            creditsum += parseInt(this.khataAmountItemlist[index].amount);
          }
          this.totalSumvalue = debitsum - creditsum;
        }
        console.log(this.totalSumvalue)
        if (this.totalSumvalue >= 0) {
          this.TotalValueLenaHai = Math.abs(this.totalSumvalue);
        }
        else {
          this.TotalValueDenaHai = Math.abs(this.totalSumvalue);
        }
      }
      else {
        this.khataItemlist.noAmtData = 0;
      }
    }
  }
  //-------------------------------------Add additemStcok ------------------------------------

  additemStcok(flag: any) {
    let updatedata = {
      flag: flag,
    }
    const dialogRef = this.dialog.open(AddKhataComponent, {
      data: updatedata
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'object') {
        if (result.status === true) {
          var lastInsertedData = result.data[0];
          this.khataItemlist.push(lastInsertedData);
          this.dataService.openSnackBar(result.message, 'Dismiss')
        }
      }
    });
  }

  addAmount(id: any) {
    let updatedata = {
      id: id,
    }
    const dialogRef = this.dialog.open(AddkhataAmtComponent, {
      data: updatedata
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'object') {
        if (result.status === true) {
          var lastInsertedData = result.data[0];
          this.khataAmountItemlist.push(lastInsertedData);
          this.dataService.openSnackBar(result.message, 'Dismiss')
          this.getkhataItem();
        }
      }
    });
  }

  deleteAllHisab(id: any) {
    let data = {
      flag:'delete',
      body: 'Want to delete All Khata Amount? '
    }
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteAllHisabData(id)
      }
      if (result === 'no') {
      }
    });
  }
  deleteAllHisabData(id: any) {
    this.dataService.deleteKhataHIsab(id).subscribe(
      data => this.closeDialog(data),
      error => this.closeDialog(error)
    )
  }
  closeDialog(data: any) {
    if (data.status === true) {
      this.dataService.openSnackBar(data.message, 'Dismiss');
      this.getkhataItem()
    }
  }
// ////////////////////////////////////////////
  
  deleteCustomer(id: any) {
    let deletedata = {
      flag:'delete',
      body: 'Want to delete Khata Item? '
    };
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      data: deletedata,
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteCustomerItemList(id)
      }
      if (result === 'no') {
      }
    });
  }

  deleteCustomerItemList(id: any) {
    this.dataService.deleteCustomer(id).subscribe(
      data => this.closereDialog(data),
      error => this.closeDialog(error)
    )
  }
  closereDialog(data: any) {
    if (data.status === true) {
      this.dataService.openSnackBar(data.message, 'Dismiss');
      this.getkhataItem()
    }
  }
  //-------------------------------------------------------------------------------------
  stopPropagation(event: { stopPropagation: () => void; }) {
    event.stopPropagation()
  }
  // createPdf(khatabook:any) {
  //   var doc = new jsPDF('p', 'pt', 'letter', true);
  //   doc.setFontSize(10);
  //   doc.setFontSize(11);

  //   doc.text(30, 60, 'Customer Name  :' + '  ' + khatabook.customer_name);
  //   doc.text(30, 80, 'phone Number :' + '  ' + khatabook.customer_number);
  //   doc.text(30, 100, 'Date :' + '  ' + new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }).split(',')[0]);
    
  //   doc.text(400, 60, 'Phone Number :' + '  ' + this.shopphone_number);
  //   doc.text(400, 80, 'Email :' + '  ' + this.email);
  //   if(this.TotalValueDenaHai != ''){
  //     doc.text(30, 120, 'Total Amount get it (  Udhar Lena hai ) :' + '  ' +this.TotalValueDenaHai +' rs' );
  //   }
  //  else{
  //   doc.text(30, 120, 'Total Amount give it (  extra amount ) :' + '  ' +this.TotalValueLenaHai + ' rs' );
  //  }
  //   doc.setFont("bold");
  //   doc.setFontSize(15);
  //   doc.text(300, 20, this.company_name, 'center');
  //   doc.text(300, 40, this.shop_address, 'center');
 
    
  //   var elem = document.getElementById("khataid");
  //   var res1 = doc.autoTableHtmlToJson(elem);
  //   var cols = res1.columns;
  //   cols.splice(0,-1)
  //       doc.autoTable(res1.columns, res1.data,  {
  //       theme: 'grid', pagebreak: 'avoid',
  //       margin: { top: 140, left: 20, right: 20, bottom: 0 },
  //       columnStyles: {
  //         0: {cellWidth: 100},
  //         1: {cellWidth: 60},
  //         2: {cellWidth: 150},
  //         // etc
  //       }
  //     });
  //     doc.save(khatabook.customer_name + '- KhataHisab');
  // }
  moreInfo(data: any){
    const dialogRef = this.dialog.open(MoreHisabComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'object') {
      }
    });
  }
}

