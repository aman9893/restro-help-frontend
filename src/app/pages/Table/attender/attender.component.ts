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

@Component({
  selector: 'app-attender',
  templateUrl: './attender.component.html',
  styleUrls: ['./attender.component.scss']
})
export class AttenderComponent implements OnInit {

  user_id: any;
  attenderDataList: any;
  update_data: any;
  updatebtn: boolean = false;
  attender_id: any;
  registerForm: any;
  submitted = false;
  attenderForm!: FormGroup;


  
 public displayedColumns:any = ['attender_id', 'attender_name'];
 public dataSource :any;

  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  showDataLoader: boolean =true;



  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
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
    this.getattenderData();
    let UserId = this.authService.getUserId();
    this.user_id = UserId;
    this.createForm();
  }

  getattenderData(): void {
    this.dataService.getAttenderInfo().subscribe((data:any) => this.attenderData(data));
  }

  attenderData(data: any) {
    this.attenderDataList = data;
    console.log(this.attenderDataList);
    this.dataSource =new MatTableDataSource(this.attenderDataList);
    this.showDataLoader = false;
    this.cdref.detectChanges();
    this.setDataSourceAttributes();
  }
  createForm() {
    this.attenderForm = this.formBuilder.group({
      attender_name: new FormControl('', {
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
    if (this.attenderForm.invalid) {
      this.dataService.openSnackBar('* attender Name is mandatory ', 'Dismiss')
        return;
    }

    if (this.attenderForm.valid) {
      let attenderFormData = {
        user_id: this.user_id,
        attender_name: this.attenderForm.controls['attender_name'].value,
      };
      console.log(attenderFormData);
      this.dataService.saveAttender(attenderFormData).subscribe(
        (data: any) => this.closeDialog(data),
        (err: any) => console.log(err)
      );
    }
    this.attenderForm.reset();
    this.submitted=false;
  }

  closeDialog(data: any) {
    this.getattenderData();
  }
  cancel(data: any) {}

  edit(data: any){
    this.showUp();
    this.updatebtn =true;
    this.attenderForm.controls['attender_name'].setValue(data.attender_name);
    this.attender_id= data.attender_id;
  }
  update() {
    let attenderFormData = {
      attender_id:this.attender_id,
      user_id: this.user_id,
      attender_name: this.attenderForm.controls['attender_name'].value,
    };
    this.dataService.updateAttender(attenderFormData).subscribe(
      (data: any) => this.updateDialog(data),
      (err: any) => console.log(err)
    );
  }
  updateDialog(data:any){
    if (data.status === true) {
      this.dataService.openSnackBar(data.message, 'Dismiss')
      this.attender_id ='';

      this.attenderForm.reset();
      this.getattenderData();
      this.updatebtn =false;

    }
  }
  delete(id: any) {
    this.dataService
      .deleteAttender(id)
      .subscribe((data) => this.deleteResponse(data));
  }
  deleteResponse(data: any) {
    if (data.status === true) {
      this.dataService.openSnackBar(data.message, 'Dismiss')
      this.getattenderData();
      this.attenderForm.reset();
    }
  }
}
