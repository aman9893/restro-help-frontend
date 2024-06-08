import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DataService } from '../../service/data.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private myRoute: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public authService: AuthService,
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public updateValue: any
  ) {}
  updateFlag: boolean = false;
  sginupForm!: FormGroup;
  loginFormFlg: boolean = true;
  registerFormFlg: boolean = false;
  editdata:any

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.sginupForm = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      email: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      username: new FormControl(''),
      company_name: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      shop_address: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      phone_number: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      shop_type: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      gst: new FormControl('NA'),
      company_logo: new FormControl(''),
    });
    if(this.updateValue.name){
      this.sginupForm.controls['name'].setValue(this.updateValue.name);
      this.sginupForm.controls['email'].setValue(this.updateValue.email);
      this.sginupForm.controls['password'].setValue(this.updateValue.password);
      this.sginupForm.controls['company_name'].setValue(this.updateValue.company_name);
      this.sginupForm.controls['phone_number'].setValue(this.updateValue.phone_number);
      this.sginupForm.controls['shop_address'].setValue(this.updateValue.shop_address);
      this.sginupForm.controls['gst'].setValue(this.updateValue.gst_num);
      this.sginupForm.controls['company_logo'].setValue(this.updateValue.company_logo);
      this.sginupForm.controls['username'].setValue(this.updateValue.username);
      this.sginupForm.controls['shop_type'].setValue(this.updateValue.shop_type);
    }
  }

 

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['app-bottom-snackbar'],
    });
  }


  cancel(): void {
    this.dialogRef.close();
    this.sginupForm.reset();
  }
  ErrorMessage(value: any) {
    return 'Please Enter ' + value;
  }

  Update() {
    let userData = {
      id:this.updateValue.id,
      name: this.sginupForm['controls']['name'].value,
      email: this.sginupForm['controls']['email'].value,
      password: this.sginupForm['controls']['password'].value,
      company_name: this.sginupForm['controls']['company_name'].value,
      phone_number: this.sginupForm['controls']['phone_number'].value,
      shop_address: this.sginupForm['controls']['shop_address'].value,
      company_logo: '',
      username:  this.sginupForm['controls']['username'].value,
      gst_num:  this.sginupForm['controls']['gst'].value,
      user_expiry_date: new Date(),
      shop_type:this.sginupForm['controls']['shop_type'].value,
      trial_days: 14,
      rolename_id: 1,
    };
    this.dataService.updateData(userData).subscribe(
      (data: any) => this.closeDialog(data),
      (err: any) => console.log(err)
    );
  }

  closeDialog(data: any) {
    if (data.status === true) {
      this.openSnackBar(data.message, 'Dismiss');
      this.dialogRef.close();
      this.sginupForm.reset();
    }
    if (data.status === false) {
      this.openSnackBar(data.message.message, 'Dismiss');
    }
  }

  
}
