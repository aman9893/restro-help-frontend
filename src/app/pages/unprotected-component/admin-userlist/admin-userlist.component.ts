import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ConfrimBoxComponent } from '../../confrim-box/confrim-box.component';
import { UpdateComponent } from '../../update/update.component';

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']
})
export class AdminUserlistComponent implements OnInit {
  loginForm: any;
  showAdminUser: boolean = false;
  constructor(public dialog: MatDialog, public snackBar: MatSnackBar,
    public router: Router, public dataService: DataService, private formBuilder: FormBuilder,) { }

  Userslist: any;

  public displayedColumns = ["name", "email", "phone_number", "user_expiry_date", "company_name", "password", "trial_days", "action"]
  showDataLoader: boolean = true;
  ngOnInit() {
   
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({

      email: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change'
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change'
      }),
    });
  }
  getUsersData(): void {
    this.dataService.getAllusers()
      .subscribe(
        ( data: any) => this.UsersData(data),
      )
  }

  UsersData(data: { data: any; }) {
    this.Userslist = data.data;
    this.dataSource = new MatTableDataSource(this.Userslist);
    this.showDataLoader = false;
  }
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchView: boolean = false;


  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  showSearchView() {
    this.searchView = !this.searchView;
  }

  setDataSourceAttributes() {
    if (this.paginator !== undefined && this.sort != undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  deleteUser(id: any) {
    let deletedata = {
      flag:'delete',
      body: 'Want to delete Item? '
    };
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      width: '400px',
      autoFocus: false,
      data: deletedata
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.dataService.deleteBill(id).subscribe(
          (data: any) => this.closedeleteDialog(data),
        )
      }
      if (result === 'no') {
      }
    });
  }
  closedeleteDialog(data: { status: boolean; message: string; }) {
    if (data.status === true) {
      console.log(data)
      this.dataService.openSnackBar(data.message, 'Dismiss');
      this.getUsersData()
    }
  }


  onSubmit() {
    if (this.loginForm.valid) {
      let email= this.loginForm['controls'].email.value;
      let password= this.loginForm['controls'].password.value;
      if(email === 'aman' && password ==='aman12345@'){
          this.showAdminUser = true;
          this.getUsersData();
      }
    }
  }
}
