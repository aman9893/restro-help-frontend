import { Inject, OnInit } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';
import { CreateBillComponent } from '../../bill/create-bill/create-bill.component';
import { ConfrimBoxComponent } from '../../confrim-box/confrim-box.component';
import { InvoiceComponent } from '../../bill/invoice/invoice.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-bill-counetr',
  templateUrl: './add-bill-counetr.component.html',
  styleUrls: ['./add-bill-counetr.component.scss']
})
export class AddBillCounetrComponent implements OnInit {
  orderForm!: FormGroup;
  items!: FormArray;
  menuDataList: any;
  user_id: any;
  menuItem: any = [];
  value: any;
  myControl = new FormControl('');
  updateData: any;
  billupdate: any;
  updateFlag: boolean = false;
  billflag: any;
  totalUnitPrice: any;
  qtyr: number = 1;
  table_id: any;
  myFormValueChanges$: any;
  total_bill = 0;
  itemstable: any;
  Bill_id: any;

  constructor(
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public dialogRef: MatDialogRef<CreateBillComponent>,
    @Inject(MAT_DIALOG_DATA) public billDataValue: any,
    public dialog: MatDialog
  ) {
    let UserId = this.authService.getUserId();
    this.user_id = UserId;
  }

  ngOnInit() {
    this.total_bill = 0;
    this.billflag = this.billDataValue.flag;
    this.Bill_id = this.billDataValue.bill_data;
    if (this.billflag === 'save') {
      this.getmenuData();
      this.updateCustomer();
      this.formcall();
    }
    if (this.billflag === 'update') {
      this.getTableBillData(this.Bill_id);
      this.getmenuData();
      this.formcall();
      this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;

    }
    if (this.billflag === 'view') {
      this.getTableBillData(this.Bill_id);
      this.getmenuData();
      this.formcall();
    }
  }


  updateCustomer() {
    this.myControl.valueChanges.subscribe((selectedValue) => {
      this.filter(selectedValue);
    });
  }

  //////////////////////////////////////////////////api call/////////////////////////////////////////

  getTableBillData(table_id: any) {
    this.dataService
      .getBillByTableID(table_id)
      .subscribe((data) => this.tableData(data));
  }
  tableData(data: any) {
    let datalist = data[0];
    if (datalist && datalist.bill_order) {
      this.updateData = JSON.parse(datalist.bill_order);
      this.billupdate = this.updateData.bill_order;
      this.total_bill =this.updateData.total_bill;
      
      this.formcall();
    }
  }
  getmenuData() {
    this.dataService.getMenuInfo().subscribe((data) => this.menuData(data));
  }
  menuData(data: any) {
    this.menuDataList = data;
  }
  //////////////////////////////////////////////////api call/////////////////////////////////////////

  filter(value: any) {
    const filterValue = value.toLowerCase();
    const newvalue = this.menuDataList.filter((option: any) =>
      option.menu_name.toLowerCase().includes(filterValue)
    );
    this.menuDataList = newvalue;
    if (this.menuDataList.length === 0) {
      this.getmenuData();
    }
    if (filterValue.length === 0) {
      this.getmenuData();
    }
  }
  formcall() {
    this.orderForm = new FormGroup({
      items: new FormArray([]),
      cutomer_number:new FormControl('',[
       
      ]),
      cutomer_name:new FormControl('',[
       
      ]),
      cutomer_address:new FormControl('',[
      ]),  
    
      // "cutomer_address":req.body.cutomer_address,
      //   "restro_name":req.body.restro_name,
      //   "delivery_charge":req.body.delivery_charge,
      //   "discount":req.body.discount,
      //   "status":req.body.status,
    });
    if (this.billflag === 'update' || this.billflag === 'view') {
      console.log('sdhsjkdhksdhfkldzhb')
      if(this.updateData && this.updateData.cutomer_name != undefined  &&  this.billupdate && this.billupdate.items != undefined){
        this.orderForm.controls['cutomer_name'].setValue(this.updateData.cutomer_name);
        this.orderForm.controls['cutomer_number'].setValue(this.updateData.cutomer_number);
 
      for (let index = 0; index < this.billupdate.items.length; index++) {
        const element = this.billupdate.items[index];
        let formGroup: FormGroup = this.formBuilder.group({
          name: this.formBuilder.control(element.name, Validators.required),
          qty: this.formBuilder.control(element.qty, [
            Validators.required,
          ]),
          price: this.formBuilder.control(element.price, [
            Validators.required,
            Validators.pattern('^(0|[1-9][0-9]*)$'),
          ]),
          restro_name: this.formBuilder.control(element.restro_name, [
          ]),
        });
        this.items = this.orderForm.get('items') as FormArray;
        this.items.push(formGroup);
      }
    }
    } else {
      this.addItem();
    }
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      qty: [0, Validators.required],
      price: ['', Validators.required],
      restro_name: [''],
    });
  }

  addItem() {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }
  removeGroup(i: number) {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.removeAt(i);
  }
  //////////////////////////////////////////////////////////////////////////////

  onBookChange(event: any, idx: any) {
    this.value = event.value;
    for (let i in this.menuDataList) {
      if (event.value === this.menuDataList[i].menu_name) {
        let price = this.menuDataList[i].menu_price;
        let qty = idx.controls['qty'].value;
        let totalUnitPrice = qty * price;
        idx.controls['price'].setValue(totalUnitPrice);
      }
    }
    this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;
    this.myFormValueChanges$.subscribe((salesList: any) =>
      this.updateTotalUnitPrice(salesList)
    );
    this.getmenuData();
  }

  onKeyUpEvent(idx: any, flag: any) {
    this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;
    this.myFormValueChanges$.subscribe((salesList: any) =>
      this.updateTotalUnitPrice(salesList)
    )
    console.log(this.qtyr)
    this.qtyr= idx.controls['qty'].value
    console.log( idx.controls['qty'].value)

    let qty = idx.controls['qty'].value;
    let price = idx.controls['price'].value;
    let name = idx.controls['name'].value;
    if (flag === 'add') {
      this.qtyr = ++qty;
    }
    if (flag === 'remove') {
      if (this.qtyr != 1) {
        this.qtyr = --qty;
      }
    }
    for (let i in this.menuDataList) {
      if (name === this.menuDataList[i].menu_name) {
        let price = this.menuDataList[i].menu_price;
        this.totalUnitPrice = this.qtyr * price;
      }
    }

    idx.controls['qty'].setValue(this.qtyr);
    idx.controls['price'].setValue(this.totalUnitPrice);
 setTimeout(() => {
  this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;
  console.log(  this.myFormValueChanges$.observers.length)
  this.myFormValueChanges$.subscribe((salesList: any) =>
    this.updateTotalUnitPrice(salesList)
  );
 }, 2000);


  }

  ///////////////////////////////////////////////////////////////////////////////

  totalSum: any;
  updateTotalUnitPrice(units: any) {
    this.totalSum = 0;
    for (let i in units) {
      let totalUnitPrice = units[i].price;
      this.totalSum += totalUnitPrice;
      console.log(this.totalSum)
      this.total_bill = this.totalSum ;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////
  datasubmitTrue: boolean = false;
  onSubmit() {
    // let be = this.orderForm.value;
    // be.items.forEach((element: any) => {
    //   if (element.name === '' || element.qty === 0 ||  !this.orderForm.valid) {
    //     this.openWarrning();
    //     return;
    //   }
    // })
      
      let r = Math.random().toString(36).substring(7);
      let tableFormData = {
        user_id: this.user_id,
        bill_no: r,
        bill_order: this.orderForm.value,
        table_id: '',
        table_name: '',
        total_bill:  this.total_bill,
        bill_status: 'booked',
        cutomer_name: this.orderForm.controls['cutomer_name'].value,
        cutomer_number: this.orderForm.controls['cutomer_number'].value,
        create_date:new Date(),
        status:'Ordered',
        discount:'',
        delivery_charge:'',
        cutomer_address: '',

      };
      this.dataService.saveBill(tableFormData).subscribe(
        (data: any) => this.closeDialog(data),
        (err: any) => console.log(err)
      );
    
  }
 
  closeDialog(data: any) {
    if (data.status === true) {
      this.dialogRef.close(true);
      this.dataService.openSnackBar(data.message, 'Dismiss');
    }
  }
  openWarrning(){
    let required = {
      flag:'warn',
      body: 'Item Name And Item Quantity ,Customer Name ,Customer Number  is Required '
    };
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      width: '300px',
      autoFocus: false,
      data: required,
    });
      dialogRef.afterClosed().subscribe((result) => {
    });
  }

  /////////////////////////////////////////////////////////////////////////////////
  close() {
    this.dialogRef.close('close');
  }
  UpdateItem() {
    let r = Math.random().toString(36).substring(7);
    let tableFormData = {
      bill_id: this.billDataValue.bill_data.bill_id,
      user_id: this.user_id,
      bill_no: r,
      bill_order: this.orderForm.value,
      table_id: this.table_id,
      table_name: '',
      total_bill: this.total_bill,
      bill_status: 'booked',
      cutomer_name: this.orderForm.controls['cutomer_name'].value,
      cutomer_number: this.orderForm.controls['cutomer_number'].value,
      cutomer_address: this.orderForm.controls['cutomer_address'].value,
      create_date:new Date(),
      status:'Ordered',
      discount:'',
      delivery_charge:'20'

    };
    this.dataService.updateBill(tableFormData).subscribe(
      (data: any) => this.closeDialog(data),
      (err: any) => console.log(err)
    );
  }
  competeItem() {
    this.deleteUser();
  }

  deleteUser() {
    let deletedata = {
      body: 'Are you sure  Completed the Order',
    };
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      width: '300px',
      autoFocus: false,
      data: deletedata,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result == 'yes') {
        this.dataService
          .compelteOrder(this.billDataValue.bill_data.bill_id)
          .subscribe((data: any) => this.closedeleteDialog(data));
        this.dialogRef.close();
        window.location.reload();
      }
      if (result === 'no') {
        console.log('not deleted');
        this.dialogRef.close();
      }
    });
  }
  closedeleteDialog(data: any) {}

  downloadInvoice() {
    let invoicedata = {
      order: this.updateData,
    };
    const dialogRef = this.dialog.open(InvoiceComponent, {
      width: '300px',
      height: '400px',
      autoFocus: false,
      data: invoicedata,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
