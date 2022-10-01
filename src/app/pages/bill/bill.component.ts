import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { FormControl } from '@angular/forms';
import { ListBillComponent } from './list-bill/list-bill.component';
import { InvoiceComponent } from './invoice/invoice.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  billDataList: any;
  tableBillData: any;
  newArrayvalue: any=[];
  billid: any;
  public searchFilter: any = '';
  searchText:any;
  searchKey :any ;
  term:any;
  constructor(public dataService: DataService, public dialog: MatDialog) {}
  tableDataList: any;

  ngOnInit() {
    this.getTableData();
    this.getBillData();
  }
  getTableData() {
    this.dataService.getTableInfo().subscribe((data) => this.tableData(data));
  }
  getBillData() {
    this.dataService.getBillInfo().subscribe((data) => this.billData(data));
  }

  tableData(data: any) {
    this.tableDataList = data;
    console.log( this.tableDataList)
    this.billid= this.tableDataList.bill_id;
    console.log( this.billid)

  }
  billData(data: any) {
    this.billDataList = data;
  }

addOder(tablename: any) {
  console.log(tablename)
  let tabledata={
    tablename:tablename,
    flag:'save'
  }
    let dialogRef = this.dialog.open(CreateBillComponent, {
      width: '550px',
      height: '',
      data: tabledata,
      autoFocus: false 
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result === true){
        this.getTableData();
        this.getBillData();
      }
      console.log(`Dialog result: ${result}`);
    });
  }

// viewOder(tableInfo: any) {
//   let tabledata={
//     tablename:tableInfo,
//     flag:'view'
//   }
//   let dialogRef = this.dialog.open(CreateBillComponent, {
//     width: '600px',
//     height: '',
//     data: tabledata,
//     autoFocus: false 
//   });
//   dialogRef.afterClosed().subscribe((result) => {
//     if(result === true){
//       this.getTableData();
//       this.getBillData();
//     }
//   });
//  }

 updateOder(tableInfo: any) {
  let tabledata={
    tablename:tableInfo,
    flag:'update'
  }
  let dialogRef = this.dialog.open(CreateBillComponent, {
    width: '600px',
    height: '',
    data: tabledata,
    autoFocus: false 
  });
  dialogRef.afterClosed().subscribe((result) => {
    if(result === true){
      this.getTableData();
      this.getBillData();
    }
  });
 }
 onSearchClear() {
  this.searchKey = '';
}

applyFilter(value: string) {
  this.tableDataList.filter = this.searchKey.trim().toLowerCase();
}

viewOder(tableInfo: any) { {
  const dialogRef = this.dialog.open(InvoiceComponent, {
    width: '300px',
    autoFocus: false,
    data: tableInfo,
  });
  dialogRef.afterClosed().subscribe((result) => {});
}

}
}