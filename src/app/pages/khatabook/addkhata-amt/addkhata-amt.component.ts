import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-addkhata-amt',
  templateUrl: './addkhata-amt.component.html',
  styleUrls: ['./addkhata-amt.component.css']
})
export class AddkhataAmtComponent implements OnInit {
  user_id: any;
  updateFlag:any;
  updateValue: any;
  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,private authService: AuthService,
    public dialogRef: MatDialogRef<AddkhataAmtComponent>,
    @Inject(MAT_DIALOG_DATA) public update_data: any, public snackBar: MatSnackBar) { }

  khataFom!: FormGroup;
 
  amountType=[{value:'You Gave (उधार दिया)',id:1},{value:'You Got It(उधार वाविस मिला)',id:2}]

  ngOnInit() {
      this.updateFlag = this.update_data.flag;
    if (this.update_data !== null) {
      this.updateValue = this.update_data;
    }
    let UserId= this.authService.getUserId();
    this.user_id=UserId;
    this.createForm();
  }

   createForm() {
    this.khataFom = this.formBuilder.group({
    
      amount: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      amount_status: new FormControl('', {
        updateOn: 'change'
      }),
      description: new FormControl('', {
        updateOn: 'change'
      }),
      
    });
    if (this.updateFlag === 'update') {
      this.khataFom.controls['amount_status'].setValue(this.updateValue.amount_status)
      this.khataFom.controls['amount'].setValue(this.updateValue.amount)
    }
  }
  getError(err:any) {
    return '* is required field';
  }

  //---------------------------------------------add file end -------------------------------------
  onSubmit() {
    if (this.khataFom.valid) {
      let khataFomData = {
        khatanum:  this.updateValue.id,
        amount_status: this.khataFom.controls['amount_status'].value,
        amount: this.khataFom.controls['amount'].value,
        description:this.khataFom.controls['description'].value,
        total_amount:''
      }
      console.log(khataFomData)
      this.dataService.addKhataAmount(khataFomData).subscribe(
        data => this.closeDialog(data),
        err => console.log(err)
      )
    }
     this.khataFom.reset();
  }

  onUpdate() {
    console.log(this.khataFom.value)
    if (this.khataFom.valid) {
      console.log(this.khataFom.value)
      let khataFomData = {
        lead_id:this.updateValue.lead_id,
        user_id:  this.user_id,
        amount_status: this.khataFom.controls['amount_status'].value,
        amount: this.khataFom.controls['amount'].value,
        customer_number: this.khataFom.controls['customer_number'].value,
        total_amount:''
      }

      console.log(khataFomData)
      this.dataService.updateConatactItem(khataFomData).subscribe(
        data => this.closeDialog(data),
        err => console.log(err)
      )
    }
     this.khataFom.reset();
  }

  closeDialog(data: Object) {
    this.dialogRef.close(data);  
  }
  cancel(data: any){
    this.dialogRef.close(data);  
  }
}



