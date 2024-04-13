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
import { ConfrimBoxComponent } from '../../confrim-box/confrim-box.component';
@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css'],
})
export class CreateBillComponent implements OnInit {
  orderForm!: FormGroup;
  items!: FormArray;
  menuDataList: any;
  user_id: any;
  updateData: any;
  billupdate: any;
  billflag: any;
  totalUnitPrice: any;
  qtyr: number = 1;
  table_id: any;
  myFormValueChanges$: any;
  total_bill = 0;
  attenderDataList: any;
  conatctBookList: any;
  discount: any;
  allSubtotal: number=0;
  GrandtotalListViewbill: number=0;
  validationvalue: boolean =false;
  totalSum: any;

  constructor(
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public dialogRef: MatDialogRef<CreateBillComponent>,
    @Inject(MAT_DIALOG_DATA) public tabledata: any,
    public dialog: MatDialog
  ) {
    let UserId = this.authService.getUserId();
    this.user_id = UserId;
  }

  ngOnInit() {
    this.billflag = this.tabledata.flag;
    this.table_id = this.tabledata.tablename.table_id;
    if (this.billflag === 'update') {
      this.getTableBillData(this.table_id);
    }
    this.getmenuData();
    this.formcall();
    this.getattenderData();
    this.getConatctBookData();
    this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;
  }

  onChangeDataset() {
    let contactValue;
    let cutomer_number = this.orderForm.controls['cutomer_number'].value;
    console.log(cutomer_number)
    this.conatctBookList.forEach((ele: any) => {
      if (ele.contact_number == cutomer_number) {
        contactValue = ele.contact_name;
      }
    });
    this.orderForm.controls['cutomer_name'].setValue(contactValue);
  }


  discountListchange(){
    this.discount = this.orderForm.controls['discount'].value;
    if(this.discount < this.total_bill  ){
    this.GrandtotalListViewbill = this.total_bill - this.discount;
    console.log(this.GrandtotalListViewbill)
    }
    else{
      this.GrandtotalListViewbill =0;
    }
  }

  getConatctBookData() {
    this.dataService.getConatctList().subscribe(
      (data: any) => this.conatctBookList = data
    )
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
      this.total_bill =this.updateData.subtotal_bill;
      this.GrandtotalListViewbill =this.updateData.total_bill;
      this.formcall();
    }
  }
  getmenuData() {
    this.dataService.getMenuInfo().subscribe((data) => this.menuData(data));
  }
  menuData(data: any) {
    this.menuDataList = data;
  }
  getattenderData(): void {
    this.dataService.getAttenderInfo().subscribe((data:any) => this.attenderData(data));
  }
  attenderData(data: any) {
    this.attenderDataList = data;
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

  // ---------------------------------------------------------------------------------------

  formcall() {
    this.orderForm = new FormGroup({
      items: new FormArray([]),
      cutomer_number:new FormControl('',[
      ]),
      cutomer_name:new FormControl('',[
      ]),
      cutomer_address:new FormControl('',[
      ]), 
      attender_name: new FormControl('NoAttender',[
      ]), 
      attender_id: new FormControl('',[
      ]), 
      discount: new FormControl( '', [Validators.pattern(this.dataService.phoneValidation()),Validators.maxLength(20)]),
      token_no: new FormControl('0', [
      ]),
      payment_type: new FormControl('UPI', [
      ]),
    });
    if (this.billflag === 'update' ) {
      if(this.updateData ){
        console.log(this.updateData)
        this.orderForm.controls['cutomer_name'].setValue(this.updateData.cutomer_name);
        this.orderForm.controls['cutomer_number'].setValue(this.updateData.cutomer_number);
        this.orderForm.controls['discount'].setValue(this.updateData.discount);
        this.orderForm.controls['attender_name'].setValue(this.updateData.attender_name);
        this.orderForm.controls['payment_type'].setValue(this.updateData.payment_type);
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
          itemprice: [element.itemprice, Validators.required],
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
      itemprice: ['', Validators.required],
    });
  }

  addItem() {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  deleteValue(id:any) {
    let deletedata = {
      flag:'delete',
      body: 'Want to delete This Item? '
    };
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      width: '300px',
      autoFocus: false,
      data: deletedata,
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(result);
      if(result === 'yes'){
        this.removeGroup(id)
      }
    });
  }
  
  removeGroup(i: number) {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.removeAt(i);
  }
  //////////////////////////////////////////////////////////////////////////////

  onBookChange(event: any, idx: any) {
    for (let i in this.menuDataList) {
      if (event.target .value === this.menuDataList[i].menu_name) {
        let price = this.menuDataList[i].menu_price;
        let qty = idx.controls['qty'].value;
        let totalUnitPrice = qty * price;
        idx.controls['price'].setValue(totalUnitPrice);
        idx.controls['itemprice'].setValue(price);
      }
      this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;
        this.myFormValueChanges$.subscribe((salesList: any) =>
          this.updateTotalUnitPrice(salesList)
        )
    }
    this.getmenuData();
  }

  onKeyUpEvent(idx: any, flag: any) {
    this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;
    this.myFormValueChanges$.subscribe((salesList: any) =>
      this.updateTotalUnitPrice(salesList)
    )
    this.qtyr = idx.controls['qty'].value
    let qty = idx.controls['qty'].value;
    let price = idx.controls['price'].value;
    let name = idx.controls['name'].value;
    if (flag === 'add') {
      this.qtyr = ++qty;
    }
    if (flag === 'remove') {
      if (this.qtyr-1 === 0) {
        this.removeGroup(idx)
      }
      else{
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
      this.myFormValueChanges$.subscribe((salesList: any) =>
        this.updateTotalUnitPrice(salesList)
      );
    }, 2000);
  }

  ///////////////////////////////////////////////////////////////////////////////

  updateTotalUnitPrice(units: any) {
    this.totalSum = 0;
    for (let i in units) {
      let totalUnitPrice = units[i].price;
      this.totalSum += totalUnitPrice;
      this.total_bill = this.totalSum ;
      this.GrandtotalListViewbill = this.totalSum;
    }
  }

    //////////////////////////////////// Validation //////////////////////////////////////////////////
  

  validation(){
    let orderbe = this.orderForm.value;
    orderbe.items.forEach((element: any) => {
      if (element.name === '' || element.qty === 0 ||  !this.orderForm.valid) {
        this.validationvalue = true;
      }
      else{
        this.validationvalue = false;
      }
    })
    if(this.validationvalue){
      this.dataService.openSnackBar("* Please Select the Item & Qty", 'Dismiss');   
    }
  }

  ////////////////////////////////////Save The Data//////////////////////////////////////////////////

  onSubmit() {
    this.validation();
    if(!this.validationvalue){
      let r = Math.random().toString(36).substring(7);
      let tableFormData = {
      user_id: this.user_id,
      bill_no: r,
      bill_order: this.orderForm.value,
      table_id: this.table_id,
      table_name: this.tabledata.tablename.table_name,
      total_bill: this.GrandtotalListViewbill,
      subtotal_bill: this.total_bill,
      bill_status: 'booked',
      cutomer_name: this.orderForm.controls['cutomer_name'].value,
      cutomer_number: this.orderForm.controls['cutomer_number'].value,
      create_date: new Date(),
      status:'tablebook',
       discount: this.orderForm.controls['discount'].value,
      delivery_charge: '',
      cutomer_address: '',
      attender_name: this.orderForm.controls['attender_name'].value,
      attender_id: '',
      token_no:this.orderForm.controls['token_no'].value,
      payment_type:this.orderForm.controls['payment_type'].value,
    };
    this.dataService.saveBill(tableFormData).subscribe(
      (data: any) => this.closeDialog(data),
      (err: any) => console.log(err)
    );
    }
  }


  /////////////////////////////Update The Item/////////////////////////////////////////////////

  UpdateItem() {
    this.validation();
    if(!this.validationvalue){
    let tableFormData = {
      bill_id: this.tabledata.tablename.bill_id,
      user_id: this.user_id,
      bill_no: this.tabledata.tablename.bill_no,
      bill_order: this.orderForm.value,
      table_id: this.table_id,
      table_name: this.tabledata.tablename.table_name,
      total_bill: this.GrandtotalListViewbill,
      subtotal_bill: this.total_bill,
      bill_status: 'booked',
      cutomer_name: this.orderForm.controls['cutomer_name'].value,
      cutomer_number: this.orderForm.controls['cutomer_number'].value,
      create_date: new Date(),
      status:'tablebook',
       discount: this.orderForm.controls['discount'].value,
      delivery_charge: '',
      cutomer_address: '',
      attender_name: this.orderForm.controls['attender_name'].value,
      attender_id: '',
      token_no:this.orderForm.controls['token_no'].value,
      payment_type:this.orderForm.controls['payment_type'].value,

    };
    this.dataService.updateBill(tableFormData).subscribe(
      (data: any) => this.closeDialog(data),
      (err: any) => console.log(err)
    );
    this.validation();
      }  }

  closeDialog(data: any) {
    if (data.status === true) {
      this.dataService.openSnackBar(data.message, 'Dismiss');
      this.getmenuData();
      this.dialogRef.close(true);
    }
  }
  close() {
    this.dialogRef.close('close');
  }
}
