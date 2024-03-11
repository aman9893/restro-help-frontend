import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.service';
import { ConfrimBoxComponent } from '../confrim-box/confrim-box.component';
import { AddBillCounetrComponent } from './add-bill-counetr/add-bill-counetr.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceComponent } from '../bill/invoice/invoice.component';

@Component({
  selector: 'app-bill-counter',
  templateUrl: './bill-counter.component.html',
  styleUrls: ['./bill-counter.component.scss']
})
export class BillCounterComponent implements OnInit {
  searchView: boolean | undefined;
  listView: boolean | undefined ;
  GirdView!: boolean;
  showDataLoader: boolean = true;
  searchedKeyword!: string;
  BillData: any;
  public displayedColumns:any = ['bill_id', 'create_date', 'status', 'bill_no', 'cutomer_name','total_bill'];
  public dataSource :any;
 
   @ViewChild(MatSort) sort = {} as MatSort;
   @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  categoryDataList: any;
  constructor(public dataService: DataService,
  public snackBar: MatSnackBar, public dialog: MatDialog) { }

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
    this.dataService.getBillInfo().subscribe((data) => this.billData(data));
  }
  billData(data: Object): void {
    this.BillData = data;
    this.dataSource =new MatTableDataSource(this.BillData);
    this.setDataSourceAttributes();
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

  addBill(flag:any, data:any) {
    let updatedata = {
      flag: flag,
      bill_data: data,
    }
    const dialogRef = this.dialog.open(AddBillCounetrComponent, {
      panelClass: 'my-full-screen-dialog',
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
      data: updatedata
    });
    dialogRef.afterClosed().subscribe((result: any) => {
        if (result === true) {
          this.getBillData();
      }
    });
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
      console.log(result);
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
      }
      this.dataService.openSnackBar(data.message, 'Dissmiss')
    }

    downloadInvoice(id:any) {
      let invoicedata = {
        order: id,
        billcounter:true, bill:'counter'
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
