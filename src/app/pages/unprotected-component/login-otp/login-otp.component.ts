import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login-otp',
  templateUrl: './login-otp.component.html',
  styleUrls: ['./login-otp.component.css']
})
export class LoginOtpComponent implements OnInit {

  showOtp: boolean = false;
  message: any;
  showphoneDiv: boolean = true;
  userId: any;
  constructor(
    private formBuilder: FormBuilder, private dataService: DataService, public dialogRef: MatDialogRef<LoginOtpComponent>,
    private snackBar: MatSnackBar, public router: Router) { }
  ForgototpForm!: FormGroup;
  ForgotPhoneForm!: FormGroup ;
  ngOnInit() {
    this.createForm();
  }



  private createForm() {

    this.ForgototpForm = this.formBuilder.group({
      otp: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),

    });
    this.ForgotPhoneForm = this.formBuilder.group({
      phone: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),

    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['app-bottom-snackbar']
    });
  }

  ErrorMessage(value: string) {
    return 'Please Enter vaild ' + value;
  }

  onSubmit(value:any) {
    // if (value == 'otpCheck') {
    //   let userData = {
    //     value: value,
    //     email: this.ForgototpForm['controls'].otp.value,
    //   }

    //   this.dataService.forgetPassData(userData).subscribe(
    //     data => this.closeDialog(data),
    //     err => console.log(err)
    //   )
    // }
    // else {
    //   if (value === 'phone') {
    //     console.log(this.ForgotPhoneForm['controls'].phone.value)
    //     let userData = {
    //       value: 'nootpCheck',
    //       flag:'phone',
    //       phone: this.ForgotPhoneForm['controls'].phone.value,
    //     }
    //     this.dataService.forgetPassData(userData).subscribe(
    //       data => this.closeDialog(data),
    //       err => console.log(err)
    //     )
    //   }
    // }
    this.verify()
  }

  closeDialog(data:any) {
    console.log(data)
    if (data.status === true) {
      this.message = data.message;
      if (data.flag === 'otpsend') {
        this.showOtp = true;
      }
    }
    if (data.status === false) {
      this.message = data.message;
      this.openSnackBar(data.message, 'Dismiss')
    }
    if (data.flag === 'otpverify') {
      this.openSnackBar(data.message, 'Dismiss')
    }
  }

  verify(){
    this.dialogRef.close('done');
  }
}
