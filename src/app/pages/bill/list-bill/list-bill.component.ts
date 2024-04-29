import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.service';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddBillCounetrComponent } from '../../bill-counter/add-bill-counetr/add-bill-counetr.component';
import { ConfrimBoxComponent } from '../../confrim-box/confrim-box.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements  OnInit {
  searchView: boolean | undefined;
  listView: boolean | undefined ;
  GirdView!: boolean;
  showDataLoader: boolean = false;
  dashborddata: boolean = false;
  displayedColumns: any;
;
  searchedKeyword!: string;
  BillData:any=[];
  public dataSource :any;
 
   @ViewChild(MatSort) sort = {} as MatSort;
   @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  categoryDataList: any;
  constructor(public dataService: DataService,private cdref: ChangeDetectorRef,
  public snackBar: MatSnackBar, public dialog: MatDialog,router: Router) { 
    if(router.routerState.snapshot.url == '/' || router.routerState.snapshot.url == '/home'){
      this.dashborddata = true;
        this.displayedColumns = [ 'create_date', 'status', 'bill_no'];
    }
    else{
      this.displayedColumns = ['bill_id', 'create_date', 'status', 'bill_no'];
      }
  }

  stopPropagation(event:any) {
    event.stopPropagation()
  }
  ngOnInit() {
    this.getBillData();
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
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
 
  showUp() {
    let element :any = document.querySelector('#goUp');
    element.scrollIntoView();
 }
  getBillData() {
    this.dataService.getBillInfo().subscribe((data) => this.billDataCall(data));
  }
  billDataCall(data: Object): void {
    let billlist :any;
    billlist= data;
    billlist.forEach((ele:any) => {
      if(ele.status === "tablebook"){
        this.BillData.push(ele);
      }
    });
    this.dataSource =new MatTableDataSource(this.BillData);
    this.showDataLoader = false;
  }
 
  showSearchView() {
    this.searchView = !this.searchView;
  }
  showListView() {
    this.listView = true;
    this.GirdView = false;
  }
  showGirdView() {
    this.listView = false;
    this.GirdView = true;
    this.searchView = false;
  }

  deleteBillListValue(id:any) {
    let deletedata = {
      flag:'delete',
      body: 'Want to delete? '
    };
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      width: '300px',
      autoFocus: false,
      data: deletedata,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if(result === 'yes'){
        this.deleteBillList(id)
      }
    });
  }

  deleteBillList(id:any) {
    this.dataService.deleteBill(id).subscribe(
      (      data: any) => this.deleteResponse(data, id),
    )
  }
  deleteResponse(data:any, id:any) {
    if (data.status === true) {
       this.getBillData();
       this.setDataSourceAttributes();
       this.BillData=[];
      }
      this.dataService.openSnackBar(data.message, 'Dissmiss')
    }

    downloadInvoice(id:any) {
      let invoicedata = {
         order: id,
         billcounter:true,
         bill:'counter'
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
      dialogRef.afterClosed().subscribe((result) => {});
    }
}
