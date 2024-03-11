import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-add-contact-book',
  templateUrl: './add-contact-book.component.html',
  styleUrls: ['./add-contact-book.component.css']
})
export class AddContactBookComponent implements OnInit {
  ContactForm!: FormGroup;
  submitted = false;
  updateValue: any;
  split_name:any;
  first_name1:any;
  last_name2:any;
  user_id: any;

  constructor(private formBuilder: FormBuilder, public dataService: DataService,
    public dialogRef: MatDialogRef<AddContactBookComponent>, private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public update_data: any,) { }

  ngOnInit() {
    let UserId = this.authService.getUserId();
    this.user_id = UserId
    if (this.update_data.flag === 'update') {
      this.updateValue = this.update_data.data;
      this.split_name = this.updateValue.contact_name.split(" ");
      this.first_name1 = this.split_name[0];
      this.last_name2 = this.split_name[1];
    }
    this.createForm()
  }
  createForm() {
    this.ContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.email]],
      phonenumber: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(9)]],
      contact_status: (1)
    });
    if (this.update_data.flag === 'update') {
      this.ContactForm.controls['firstName'].setValue(this.first_name1)
      this.ContactForm.controls['lastName'].setValue(this.last_name2)
      this.ContactForm.controls['email'].setValue(this.updateValue.contact_email)
      this.ContactForm.controls['phonenumber'].setValue(this.updateValue.contact_number)
      this.ContactForm.controls['contact_status'].setValue(this.updateValue.contact_status)
    }
  }
  onSubmit() {
    let fullName = this.ContactForm.controls['firstName'].value + ' ' + this.ContactForm.controls['lastName'].value;
    let ContactFormData = {
      user_id: this.user_id,
      contact_name: fullName,
      contact_number: this.ContactForm.controls['phonenumber'].value,
      contact_email: this.ContactForm.controls['email'].value,
      contact_status: this.ContactForm.controls['contact_status'].value,
    }
    this.dataService.addConatctBook(ContactFormData).subscribe(
      data => this.closeContactDialog(data),
      err => console.log(err)
    )
  }

  ErrorMessage(value:any) {
    return value + ' is required'
  }
  ErrorvalidMessage(value:any) {
    return 'Enter Valid ' + value
  }
  onUpdate() {
    let fullName = this.ContactForm.controls['firstName'].value + ' ' + this.ContactForm.controls['lastName'].value;
    let ContactFormData = {
      contact_id: this.updateValue.contact_id,
      user_id: this.user_id,
      contact_name: fullName,
      contact_number: this.ContactForm.controls['phonenumber'].value,
      contact_email: this.ContactForm.controls['email'].value,
      contact_status: this.ContactForm.controls['contact_status'].value,
    }
    this.dataService.updateConatactItem(ContactFormData).subscribe(
      data => this.closeContactDialog(data),
      err => console.log(err)
    )
  }
  closeContactDialog(data:any) {
    if(data.status === true){
      this.dialogRef.close(data)
      this.dataService.openSnackBar(data.message, 'Dismiss')
    }
    else{
      this.dialogRef.close(data)
      this.dataService.openSnackBar(data.message, 'Dismiss')
    }
  }

  closeDialog(data:any){
    this.dialogRef.close(data);
  }
}