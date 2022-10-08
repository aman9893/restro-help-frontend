import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.service';
import { ConfrimBoxComponent } from '../../confrim-box/confrim-box.component';
import { AddContactBookComponent } from '../add-contact-book/add-contact-book.component';

@Component({
  selector: 'app-list-contact-book',
  templateUrl: './list-contact-book.component.html',
  styleUrls: ['./list-contact-book.component.css']
})
export class ListContactBookComponent implements OnInit {
  searchView: boolean | undefined;
  listView: boolean | undefined ;
  GirdView!: boolean;
  showDataLoader: boolean = true;
  ConatctBookData=[];
  dataSource: any;
  searchedKeyword!: string;
  constructor(public dataService: DataService,
  public snackBar: MatSnackBar, public dialog: MatDialog) { }

  stopPropagation(event:any) {
    event.stopPropagation()
  }
  ngOnInit() {
    this.getConatctBookData();
    if (window.screen.width === 360) { // 768px portrait
      this.GirdView = true;
    }
    else{
      this.listView = true;
    }
  }
  openPhone(PhoneNumber:any) {
    window.location.href = "tel://" + PhoneNumber;
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

  getConatctBookData() {
    this.dataService.getConatctList().subscribe(
      (      data: any) => this.showtodoDetails(data),
    )
  }
  showtodoDetails(data:any) {
    this.ConatctBookData = data
    this.showDataLoader = false;
  }

  addContact(flag:any, data:any) {
    let updatedata = {
      flag: flag,
      data: data,
    }
    const dialogRef = this.dialog.open(AddContactBookComponent, {
      width: '550px',
      data: updatedata
    });
    dialogRef.afterClosed().subscribe((result: { status: boolean; data: any[]; message: any; }) => {
      if (typeof result === 'object') {
        if (result.status === true) {
          let lastInsertedData = result.data[0];
          // this.ConatctBookData.unshift(lastInsertedData);
          this.dataService.openSnackBar(result.message, 'Dissmiss')
          this.getConatctBookData();
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
      this.getConatctBookData()
      }
      this.dataService.openSnackBar(data.message, 'Dissmiss')
    }
  
  openWhatapp(PhoneNumber:any){
    window.location.href ='https://wa.me/'+PhoneNumber;
  }
}
