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
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss']
})
export class MenulistComponent implements OnInit {
  user_id: any;
  tableDataList: any;
  update_data: any;
  updatebtn: boolean = false;
  menu_id: any;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) {}

  tableForm!: FormGroup;
  ngOnInit() {
    this.getTableDatamenu();
    let UserId = this.authService.getUserId();
    console.log(UserId);
    this.user_id = UserId;
    this.createForm();
  }

  getTableDatamenu(): void {
    this.dataService.getMenuInfo().subscribe((data) => this.tableData(data));
  }

  tableData(data: any) {
    this.tableDataList = data;
    console.log(this.tableDataList);
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
    });
  }

  ErrorMessage() {
    return '*This is required field';
  }

  //---------------------------------------------add file end -------------------------------------
  onSubmit() {
    if (this.tableForm.valid) {
      let tableFormData = {
        user_id: this.user_id,
        menu_name: this.tableForm.controls['menu_name'].value,
        menu_price: this.tableForm.controls['menu_price'].value,
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
    this.dataService.openSnackBar(data.message, 'Dismiss')
  }
  cancel(data: any) {}

  edit(data: any){
    this.updatebtn =true;
    this.tableForm.controls['menu_name'].setValue(data.menu_name);
    this.tableForm.controls['menu_price'].setValue(data.menu_price);
    this.menu_id= data.menu_id;
  }
  update() {
    let tableFormData = {
      menu_id:this.menu_id,
      user_id: this.user_id,
      menu_name: this.tableForm.controls['menu_name'].value,
      menu_price: this.tableForm.controls['menu_price'].value,
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

    }
  }
  delete(id: any) {
    this.dataService
      .deleteMenu(id)
      .subscribe((data) => this.deleteResponse(data));
  }
  deleteResponse(data: any) {
    if (data.status === true) {
      this.dataService.openSnackBar(data.message, 'Dismiss')
      this.getTableDatamenu();
    }
  }

}
