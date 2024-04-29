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
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfrimBoxComponent } from '../confrim-box/confrim-box.component';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrl: './tax.component.scss'
})
export class TaxComponent implements OnInit {

  user_id: any;
  gstDatalist: any;
  update_data: any;
  updatebtn: boolean = false;
  attender_id: any;
  registerForm: any;
  submitted = false;
  taxform!: FormGroup;


  
 public displayedColumns:any = ['total_tax','tax_id'];
 public dataSource :any;

  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  showDataLoader: boolean =true;
  tax_id: any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthService, public dialog: MatDialog,
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
    this.getTaxvalue();
    let UserId = this.authService.getUserId();
    this.user_id = UserId;
    this.createForm();
  }

  getTaxvalue(): void {
    this.dataService.getTaxInfo().subscribe((data:any) => this.taxdata(data));
  }

  taxdata(data: any) {
    this.gstDatalist = data;
    console.log(data)
    this.dataSource =new MatTableDataSource(this.gstDatalist);
    this.setDataSourceAttributes();
  }
  createForm() {
    this.taxform = this.formBuilder.group({
      total_gst: new FormControl('', {
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
    if (this.taxform.invalid) {
      this.dataService.openSnackBar('* tax amount  is mandatory ', 'Dismiss')
        return;
    }

    if (this.taxform.valid) {
      let taxformData = {
        user_id: this.user_id,
        total_tax: this.taxform.controls['total_gst'].value,
      };
      this.dataService.saveTax(taxformData).subscribe(
        (data: any) => this.closeDialog(data),
        (err: any) => console.log(err)
      );
    }
    this.taxform.reset();
    this.submitted=false;
  }

  closeDialog(data: any) {
    this.getTaxvalue();
  }
  cancel(data: any) {}

  edit(data: any){
    this.showUp();
    this.updatebtn =true;
    this.taxform.controls['total_gst'].setValue(data.total_tax);
    this.tax_id= data.tax_id;
  }
  update() {
    let taxformData = {
      tax_id:this.tax_id,
      user_id: this.user_id,
      total_tax: this.taxform.controls['total_gst'].value,
    };
    this.dataService.updatetax(taxformData).subscribe(
      (data: any) => this.updateDialog(data),
      (err: any) => console.log(err)
    );
  }
  updateDialog(data:any){
    if (data.status === true) {
      this.dataService.openSnackBar(data.message, 'Dismiss')
      this.attender_id ='';

      this.taxform.reset();
      this.getTaxvalue();
      this.updatebtn =false;

    }
  }
  delete(id: any) {
    this.dataService
      .deletetax(id)
      .subscribe((data) => this.deleteResponse(data));
  }
  deleteResponse(data: any) {
    if (data.status === true) {
      this.dataService.openSnackBar(data.message, 'Dismiss')
      this.getTaxvalue();
      this.taxform.reset();
    }
  }

  deleteValue(id:any) {
    let deletedata = {
      flag:'delete',
      body: 'Want to delete Attender? '
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

