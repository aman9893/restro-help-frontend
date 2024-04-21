import { Component, OnInit ,AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfrimBoxComponent } from 'src/app/pages/confrim-box/confrim-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss']
})
export class MenulistComponent implements OnInit ,AfterViewInit  {
  user_id: any;
  billData: any;
  update_data: any;
  updatebtn: boolean = false;
  menu_id: any;
  tableForm!: FormGroup;
  showDataLoader: boolean= false;


 public displayedColumns:any = ['menu_name', 'menu_price' ,'menu_categories','menu_id' ];
 public dataSource :any;

  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  categoryDataList: any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,public dialog: MatDialog,
    public snackBar: MatSnackBar,private cdref: ChangeDetectorRef,
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
    this.showDataLoader =true;
    this.createForm();
    let UserId = this.authService.getUserId();
    this.user_id = UserId;
    this.getTableDatamenu();

    this.getcategoryData();

  }
  getTableDatamenu(): void {
    this.dataService.getMenuInfo().subscribe((data) => this.tableData(data),
    (err: Error) => this.errorcall(err));
  }
  tableData(data: any) { 
    this.showDataLoader = true;
    this.billData= data;
    if( this.billData){
    this.dataSource =new MatTableDataSource(this.billData);
    this.setDataSourceAttributes();
    this.showDataLoader = false;

    }
  }

  errorcall(errorcall:any){
     this.dataService.openSnackBar(errorcall.message,'Dismiss');
     this.showDataLoader = false;

  }

  getcategoryData(): void {
    this.dataService.getcategoryList().subscribe((data) => this.categoryData(data));
  }

  categoryData(data: any) {
    this.categoryDataList = data;

  }

  createForm() {
    this.tableForm = this.formBuilder.group({
      menu_name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        // updateOn: 'blur',
      }),
      menu_price: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        // updateOn: 'blur',
      }),
      menu_url: new FormControl('', {
        // validators: [Validators.required, Validators.maxLength(500)],
        // updateOn: 'blur',
      }),
      menu_categories: new FormControl('', {
        // validators: [Validators.required, Validators.maxLength(500)],
        // updateOn: 'blur',
      }),
    });
  }

  ErrorMessage() {
    return '*This is required field';
  }

  //---------------------------------------------add file end -------------------------------------
  onSubmit() {
    let menuname ;
    let category_id =this.tableForm.controls['menu_categories'].value;
    this.categoryDataList .forEach((element: any) => {
        if(element.category_id == category_id){
          menuname=element.category_name;
        }
    });
    if (this.tableForm.invalid) {
      this.dataService.openSnackBar('* Item Name  And Item Price is mandatory ', 'Dismiss')
      return;
  }
  this.showDataLoader =true;

    if (this.tableForm.valid) {
      let tableFormData = {
        user_id: this.user_id,
        menu_name: this.tableForm.controls['menu_name'].value,
        menu_price: this.tableForm.controls['menu_price'].value,
        menu_url: this.tableForm.controls['menu_url'].value,
        menu_categories: menuname,
        category_id: this.tableForm.controls['menu_categories'].value,
      };
      console.log(tableFormData);
      this.dataService.saveMenu(tableFormData).subscribe(
        (data: any) => this.closeDialog(data),
        (err: any) => console.log(err)
      );
    }
    this.tableForm.reset();
  }

  closeDialog(data: any) {
    this.getTableDatamenu();
    if(data.status===false){
      this.dataService.openSnackBar(data.message.sqlMessage, 'Dismiss');
    }
    else{
      this.dataService.openSnackBar(data.message, 'Dismiss');
    }
    this.createForm();
    this.showDataLoader =false;
  }
  cancel(data: any) {}

  edit(data: any){

    this.showUp()
    this.updatebtn =true;
    this.tableForm.controls['menu_name'].setValue(data.menu_name);
    this.tableForm.controls['menu_price'].setValue(data.menu_price);
    this.tableForm.controls['menu_url'].setValue(data.menu_url);
    this.tableForm.controls['menu_categories'].setValue(data.category_id);
    this.menu_id= data.menu_id;
  }
  update() {
    let menuname ;
    let category_id =this.tableForm.controls['menu_categories'].value;
    console.log(category_id)
    this.categoryDataList .forEach((element: any) => {
        if(element.category_id == category_id){
          menuname=element.category_name;
        }
    });
    this.showDataLoader =true;
    let tableFormData = {
      menu_id:this.menu_id,
      user_id: this.user_id,
      menu_name: this.tableForm.controls['menu_name'].value,
      menu_price: this.tableForm.controls['menu_price'].value,
      menu_url: this.tableForm.controls['menu_url'].value,
      menu_categories: menuname,
      category_id: this.tableForm.controls['menu_categories'].value,
    };
    this.dataService.updateMenu(tableFormData).subscribe(
      (data: any) => this.updateDialog(data),
      (err: any) => console.log(err)
    );
  }
  updateDialog(data:any){
    if (data.status === true) {
      this.menu_id ='';
      this.updatebtn = false;
      this.getTableDatamenu();
      this.dataService.openSnackBar(data.message, 'Dismiss')
      this.tableForm.reset();
      this.createForm();
      this.setDataSourceAttributes();
      this.showDataLoader =false;
    }
  }
  delete(id: any) {
    this.showDataLoader =true;
    this.dataService
      .deleteMenu(id)
      .subscribe((data) => this.deleteResponse(data));
  }
  deleteResponse(data: any) {
    if (data.status === true) {
      this.dataService.openSnackBar(data.message, 'Dismiss')
      this.getTableDatamenu();
      this.showDataLoader =false;
    }
    if (data.status === false) {
      this.dataService.openSnackBar(data.message, 'Dismiss')
      this.showDataLoader =false;
    }
  }

  deleteValue(id:any) {
    let deletedata = {
      flag:'delete',
      body: 'Want to delete Item? '
    };
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      width: '300px',
      autoFocus: false,
      data: deletedata,
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(result);
      if(result === 'yes'){
        this.delete(id)
      }
    });
  }
}
