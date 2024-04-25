import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-add-khata',
  templateUrl: './add-khata.component.html',
  styleUrls: ['./add-khata.component.css']
})
export class AddKhataComponent implements OnInit {
  user_id: any;
  updateFlag:any;
  updateValue: any;
  conatctBookList: any;
  myFormValueChangesname$:any;
  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,private authService: AuthService,
    public dialogRef: MatDialogRef<AddKhataComponent>,
    @Inject(MAT_DIALOG_DATA) public update_data: any, public snackBar: MatSnackBar) { }

  khataFom!: FormGroup;
  ngOnInit() {
    this.getgetConatctList();
    this.createForm();
    let UserId= this.authService.getUserId();
    this.user_id=UserId;
  }

  getgetConatctList(): void {
    this.dataService.getConatctList()
      .subscribe(
        data => this.contactData(data),
      )
  }

  onChangeDataset() {
    let contactValue:any;
    let cutomer_number = this.khataFom.controls['customer_number'].value;
    this.conatctBookList.forEach((ele: any) => {
      if (ele.contact_number == cutomer_number) {
        contactValue = ele.contact_name  ;
      }
    });
    console.log(contactValue)
    this.khataFom.controls['customer_name'].setValue(contactValue);
  }

 contactData(data: any) {
    this.conatctBookList = data;
  }
   createForm() {
    this.khataFom = this.formBuilder.group({
      customer_name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change'
      }),
      customer_number: ['', [Validators.maxLength(12)]],

      amount: new FormControl('', {
        validators: [],
        updateOn: 'change'
      }), 
      amount_status: new FormControl('', {
        updateOn: 'change'
      }),
    });
  }


  ErrorMessage(msg:any) {
    return '*This is required field';
  }

  ErrorvalidMessage(value: string) {
    return 'Enter Valid ' + value
  }

  //---------------------------------------------add file end -------------------------------------
  onSubmit() {
    if (this.khataFom.valid) {
      let khataFomData = {
        user_id:  this.user_id,
        customer_name: this.khataFom.controls['customer_name'].value,
        amount: this.khataFom.controls['amount'].value,
        customer_number: this.khataFom.controls['customer_number'].value,
        amount_status: this.khataFom.controls['amount_status'].value,
        total_amount:0
      }
      this.dataService.addKhatabookList(khataFomData).subscribe(
        ( data: any) => this.closeDialog(data),
        ( err: any) => console.log(err)
      )
    }
     this.khataFom.reset();
  }

  closeDialog(data: any) {
    this.dialogRef.close(data);  
  }
  cancel(data:any){
    this.dialogRef.close(data);  
  }
}



