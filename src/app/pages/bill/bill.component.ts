import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { FormControl } from '@angular/forms';
import { ListBillComponent } from './list-bill/list-bill.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  billDataList: any;
  tableBillData: any;
  newArrayvalue: any = [];
  billid: any;
  searchText: any;
  searchKey: any;
  term: any;
  mobileview: boolean =false;
  constructor(public dataService: DataService, public dialog: MatDialog, private cdref: ChangeDetectorRef,private router: Router) {
    this.router.events.subscribe((event: any) => {
      this.getTableData();
      this.getBillData();
    })
   }
  tableDataList: any;
  showDataLoader: boolean = true;

  ngOnInit() {
    this.getTableData();
    this.getBillData();
    this.mobileview = this.dataService.getIsMobileResolution();
  
  }
  getTableData() {
    this.dataService.getTableInfo().subscribe((data) => this.tableData(data));
  }
  getBillData() {
    this.dataService.getBillInfo().subscribe((data) => this.billData(data));
  }

  tableData(data: any) {
    this.tableDataList = data;
    this.showDataLoader = false;
  }

  billData(data: any) {
    this.billDataList = data;
  }

  addOder(tablename: any) {
    let tabledata = {
      tablename: tablename,
      flag: 'save'
    }
    let dialogRef = this.dialog.open(CreateBillComponent, {
      panelClass: 'my-full-screen-dialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: tabledata,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getTableData();
        this.getBillData();
      }
    });
  }



  updateOder(tableInfo: any) {
    let tabledata = {
      tablename: tableInfo,
      flag: 'update'
    }
    let dialogRef = this.dialog.open(CreateBillComponent, {
      panelClass: 'my-full-screen-dialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: tabledata,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.getTableData();
        this.getBillData();
      }
    });
  }


  applyFilter(value: string) {
    this.tableDataList.filter = this.searchKey.trim().toLowerCase();
  }

  viewOder(id: any) {
    let invoicedata = {
      tableid: id,
      billcounter:false,
       bill:'tableBilling'
    };
      const dialogRef = this.dialog.open(InvoiceComponent, {
        panelClass: 'my-full-screen-dialog',
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        autoFocus: false,
        data: invoicedata,
      });
      dialogRef.afterClosed().subscribe((result) => { });
    }
  
}