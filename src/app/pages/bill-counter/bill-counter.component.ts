import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.service';
import { ConfrimBoxComponent } from '../confrim-box/confrim-box.component';
import { AddContactBookComponent } from '../contact-book/add-contact-book/add-contact-book.component';
import { AddBillCounetrComponent } from './add-bill-counetr/add-bill-counetr.component';

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
  ConatctBookData=[];
  dataSource: any;
  searchedKeyword!: string;
  BillData: any;
  constructor(public dataService: DataService,
  public snackBar: MatSnackBar, public dialog: MatDialog) { }

  stopPropagation(event:any) {
    event.stopPropagation()
  }
  ngOnInit() {
    this.getBillData()
   
  }
  getBillData() {
    this.dataService.getBillInfo().subscribe((data) => this.billData(data));
  }
  billData(data: Object): void {
    console.log(data);
    this.BillData = data
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

 

 
  addContact(flag:any, data:any) {
    let updatedata = {
      flag: flag,
      bill_data: data,
    }
    const dialogRef = this.dialog.open(AddBillCounetrComponent, {
      width: '550px',
      data: updatedata
    });
    dialogRef.afterClosed().subscribe((result: { status: boolean; data: any[]; message: any; }) => {
      if (typeof result === 'object') {
        if (result.status === true) {
          let lastInsertedData = result.data[0];
          // this.ConatctBookData.unshift(lastInsertedData);
          this.dataService.openSnackBar(result.message, 'Dissmiss')
        }
      }
    });
  }

  deletestock(id:any) {
    this.deleteContactType(id)

  }
  deleteContactType(id:any) {
    this.dataService.deleteConatctitem(id).subscribe(
      (      data: any) => this.deleteResponse(data, id),
    )
  }
  deleteResponse(data:any, id:any) {
    if (data.status === true) {
      this.getBillData()
      }
      this.dataService.openSnackBar(data.message, 'Dissmiss')
    }
}
