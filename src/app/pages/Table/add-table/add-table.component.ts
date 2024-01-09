import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.scss'],
})
export class AddTableComponent implements OnInit {
  user_id: any;
  tableDataList: any;
  update_data: any;
  updatebtn: boolean = false;
  table_id: any;
  registerForm: any;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) {}

  tableForm!: FormGroup;
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
    console.log(this.tableDataList);
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
        return;
    }

    if (this.tableForm.valid) {
      let tableFormData = {
        user_id: this.user_id,
        table_name: this.tableForm.controls['table_name'].value,
      };
      console.log(tableFormData);
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
    }
  }
}
