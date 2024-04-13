import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  showOtp: boolean = false;
  message: any;
  displayParameter: any;
  showphoneDiv: boolean = true;
  showemailDiv: boolean =true;
  showresetwindow!: boolean;
  userId: any;
  constructor(
    private formBuilder: FormBuilder, private dataService: DataService,
    private snackBar: MatSnackBar, public router: Router,) { }

  ForgotForm!: FormGroup;
  ForgototpForm!: FormGroup;
  showDataLoader:boolean=false;
  ForgotPhoneForm!: FormGroup;
  ngOnInit() {
    this.createForm();
  }

  wrongPassword: boolean = false;

  changePassword(newPassword: HTMLInputElement, reNewPassword: HTMLInputElement): void {
    if (newPassword.value == reNewPassword.value) {
      this.openSnackBar('Input fileds Matched', 'Dismiss');
      let userData = {
        id: this.userId,
        password: newPassword.value,
      }
      this.dataService.updatePassword(userData).subscribe(
        (data: any) => this.passDialog(data),
        (err: any) => console.log(err)
      )
    }
    else {
      this.openSnackBar('Input fileds mismatched', 'Dismiss');
    }
  }

  passDialog(data: { status: boolean; message: string; }) {
    if (data.status === true) {
      this.openSnackBar(data.message, 'Dismiss');
      this.router.navigate(['/login']);
    }
  }

  private createForm() {
    this.ForgotForm = this.formBuilder.group({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email, Validators.maxLength(55)],
        updateOn: 'change'
      }),

    });

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
  cancel(): void {
    this.ForgotForm.reset();
  }

  handleChange(evt: string) {
    if (evt === 'phone') {
      this.showphoneDiv = true;
      this.showemailDiv = false;
    }
    else {
      this.showemailDiv = true;
      this.showphoneDiv = false;
    }
  }

  onSubmit(value: string) {
    this.showDataLoader =true
    if (value == 'otpCheck') {
      let userData = {
        value: value,
        email: this.ForgototpForm['controls']['otp'].value,
      }

      this.dataService.forgetPassData(userData).subscribe(
        (data: any) => this.closeDialog(data),
        (err: any) => console.log(err)
      )
    }
    else {
      if (value === 'email') {
        let userData = {
          value: 'nootpCheck',
          flag: 'email',
          email: this.ForgotForm['controls']['email'].value,
        }
        this.dataService.forgetPassData(userData).subscribe(
          (data: any) => this.closeDialog(data),
          (err: any) => console.log(err)
        )
      }
      if (value === 'phone') {
        console.log(this.ForgotPhoneForm['controls']['phone'].value)
        let userData = {
          value: 'nootpCheck',
          flag: 'phone',
          phone: this.ForgotPhoneForm['controls']['phone'].value,
        }
        this.dataService.forgetPassData(userData).subscribe(
          (data: any) => this.closeDialog(data),
          (err: any) => console.log(err)
        )
      }
    }
  }

  closeDialog(data:any) {
    console.log(data)
    this.showDataLoader = false;

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
      this.showresetwindow = true;
      this.showOtp =false;
      this.userId = data.data;
    }
  }
}
