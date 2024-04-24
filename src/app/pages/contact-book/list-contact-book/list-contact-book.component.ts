import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.service';
import { ConfrimBoxComponent } from '../../confrim-box/confrim-box.component';
import { AddContactBookComponent } from '../add-contact-book/add-contact-book.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-contact-book',
  templateUrl: './list-contact-book.component.html',
  styleUrls: ['./list-contact-book.component.css']
})
export class ListContactBookComponent implements OnInit ,AfterViewInit{
  searchView: boolean | undefined;
  listView: boolean | undefined ;
  GirdView!: boolean;
  ConatctBookData=[];
  searchedKeyword!: string;
  
  public displayedColumns:any = ['contact_id', 'contact_name','contact_number'];
  public dataSource :any;
 
   @ViewChild(MatSort) sort = {} as MatSort;
   @ViewChild(MatPaginator) paginator = {} as MatPaginator;
   showDataLoader: boolean = true;


  constructor(public dataService: DataService,private cdref: ChangeDetectorRef,
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

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  ngAfterViewInit() {

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
      (data: any) => this.showtodoDetails(data),
    )
  }
  showtodoDetails(data:any) {
    this.ConatctBookData = data
    this.showDataLoader = false;
    this.dataSource =new MatTableDataSource(this.ConatctBookData);
    this.cdref.detectChanges();

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

  deleteContactValue(id:any) {
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
        this.deleteContactType(id)
      }
    });
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

   email(email:any)
{
  let  emaila = email;
  let email2 = 'mailto:' + email
    window.location.href = email2;
}
}
