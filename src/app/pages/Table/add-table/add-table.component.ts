import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';
import { ConfrimBoxComponent } from '../../confrim-box/confrim-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss'],
})
export class AddTableComponent implements OnInit,AfterViewInit {
  user_id: any;
  tableDataList: any;
  update_data: any;
  updatebtn: boolean = false;
  table_id: any;
  registerForm: any;
  submitted = false;
  tableForm!: FormGroup;


  
 public displayedColumns:any = ['table_name', 'table_id', ];
 public dataSource :any;

  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  showDataLoader: boolean =true;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,public dialog: MatDialog,
    public snackBar: MatSnackBar, private cdref: ChangeDetectorRef
  ) {}

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
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
  ngOnInit() {
    this.getTableData();
    let UserId = this.authService.getUserId();
    this.user_id = UserId;
    this.createForm();
  }

  getTableData(): void {
    this.dataService.getTableInfo().subscribe((data) => this.tableData(data));
  }

  tableData(data: any) {
    this.tableDataList = data;
    this.dataSource =new MatTableDataSource(this.tableDataList);
    this.showDataLoader = false;
    this.setDataSourceAttributes();
    this.cdref.detectChanges();
    
  }
  createForm() {
    this.tableForm = this.formBuilder.group({
      table_name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
    });
  }

  ErrorMessage() {
    return '*This is required field';
  }
  get f() { return this.registerForm.controls; }

  //---------------------------------------------add file end -------------------------------------
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.tableForm.invalid) {
      this.dataService.openSnackBar('* Table Name is mandatory ', 'Dismiss')
        return;
    }

    if (this.tableForm.valid) {
      let tableFormData = {
        user_id: this.user_id,
        table_name: this.tableForm.controls['table_name'].value,
      };
      this.dataService.saveTable(tableFormData).subscribe(
        (data: any) => this.closeDialog(data),
        (err: any) => console.log(err)
      );
    }
    this.tableForm.reset();
    this.submitted=false;
  }

  closeDialog(data: any) {
    this.getTableData();
  }
  cancel(data: any) {}

  edit(data: any){
    this.showUp();
    this.updatebtn =true;
    this.tableForm.controls['table_name'].setValue(data.table_name);
    this.table_id= data.table_id;
  }
  update() {
    let tableFormData = {
      table_id:this.table_id,
      user_id: this.user_id,
      table_name: this.tableForm.controls['table_name'].value,
    };
    this.dataService.updateTable(tableFormData).subscribe(
      (data: any) => this.updateDialog(data),
      (err: any) => console.log(err)
    );
  }
  updateDialog(data:any){
    if (data.status === true) {
      this.dataService.openSnackBar(data.message, 'Dismiss')
      this.table_id ='';

      this.tableForm.reset();
      this.getTableData();
      this.updatebtn =false;

    }
  }
  delete(id: any) {
    this.dataService
      .deleteTable(id)
      .subscribe((data) => this.deleteResponse(data));
  }
  deleteResponse(data: any) {
    if (data.status === true) {
      this.dataService.openSnackBar(data.message, 'Dismiss')
      this.getTableData();
      this.tableForm.reset();
    }
  }

  deleteValue(id:any) {
    let deletedata = {
      flag:'delete',
      body: 'Want to delete This Table? '
    };
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      width: '300px',
      autoFocus: false,
      data: deletedata,
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 'yes'){
        this.delete(id)
      }
    });
  }
}
