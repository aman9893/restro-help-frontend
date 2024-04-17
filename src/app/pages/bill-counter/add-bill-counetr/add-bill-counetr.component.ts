import { ChangeDetectorRef, Inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';
import { CreateBillComponent } from '../../bill/create-bill/create-bill.component';
import { ConfrimBoxComponent } from '../../confrim-box/confrim-box.component';
import { InvoiceComponent } from '../../bill/invoice/invoice.component';
import { Router } from '@angular/router';
export interface Cart {
  productName: string;
  productImage: string;
  productOwner: string;
  quantity: number;
  price: number;
}
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
  myContactValueChanges$: any;
  ListViewTotalBill = 0;
  itemstable: any;
  Bill_id: any;
  term: any;
  listView: boolean =  false;
  GirdView: boolean = true;
  categoryDataList: any;
  conatctBookList: any;
  discount: any;
  taxvalue: any;
  subtotal: number=0;
  listViewSubTotal: number=0;
  mobileview: boolean= false;
  validationvalue: boolean = false;
  itemprice: number =0;
  billDataValue:any;
  DesktopProducts: any = [];
  allProductsDesktopTotal: any = 0;
  GrandtotalListViewbill: number=0;
  manualView: boolean = true;
  constructor(
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public dialog: MatDialog,private router: Router,private cdref: ChangeDetectorRef
  ) {
    this.user_id = this.authService.getUserId();
  }
  ngOnInit() {
    this.mobileview =this.dataService.getIsMobileResolution();
    this.updateCart();
    this.getcategoryData();
    this.getConatctBookData();
    this.ListViewTotalBill = 0;
    this.billflag = "this.billDataValue.flag;"
    this.Bill_id = "this.billDataValue.bill_data;"
      this.getmenuData();
      this.updateCustomer();
      this.formcall();
      this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;
  
  }
// page All Api all-------------------------------------------------------------------------------

  getcategoryData(): void {
    this.dataService.getcategoryList().subscribe((data) => this.categoryData(data));
  }
  getConatctBookData() {
    this.dataService.getConatctList().subscribe(
      (data: any) => this.showtodoDetails(data),
    )
  }
  showtodoDetails(data: any) {
    this.conatctBookList = data;
  }
  categoryData(data: any) {
    this.categoryDataList = data;
  }
  showListView() {
    this.getmenuData();
    this.updateCustomer();
    this.formcall();
    this.listView = true;
    this.GirdView = false;
}
showGirdView() {
  this.listView = false;
  this.GirdView = true;
}
  // page All Api all-------------------------------------------------------------------------------

  // DesktopView  All Api all-------------------------------------------------------------------------------
  onChangeDataset() {
    let contactValue;
    let cutomer_number = this.orderForm.controls['cutomer_number'].value;
    this.conatctBookList.forEach((ele: any) => {
      if (ele.contact_number == cutomer_number) {
        contactValue = ele.contact_name;
      }
    });
    this.orderForm.controls['cutomer_name'].setValue(contactValue);
  }
 

  ontabChange(event:any){
               if(event.tab.textLabel !== 'All Item'){
                let category_id:any;
                for (let i in this.categoryDataList) {
                 if (event.tab.textLabel === this.categoryDataList[i].category_name) {
                    category_id =  this.categoryDataList[i].category_id;
                 }
               }
               this.filtercate(category_id)
               }
           else{
            this.getmenuData()
           }
    }

  updateCustomer() {
    this.myControl.valueChanges.subscribe((selectedValue) => {
      this.filter(selectedValue);
    });
  }

  updateCart() {
    this.dataService.getProductData().subscribe(res => {
      this.DesktopProducts = res;
      this.allProductsDesktopTotal = this.dataService.getTotalAmount();
      this.subtotal =  this.dataService.getTotalAmount();
    })
  }
  removeProduct(item: any) {
    this.dataService.removeCartData(item);
    this.updateCart();
    this.discountchange('grid')
  }

  removeAllProducts() {
    this.dataService.removeAllCart();
    this.updateCart()
    this.discountchange('grid')
  }
  addProduct(menu: any) {
    this.dataService.addToCart(menu);
    this.discountchange('grid')
  }
  // -----Increment Event------
  increase(product: any) {
    this.dataService.inProduct(product);
    this.discountchange('grid')
  }

  decrease(product: any) {
    this.dataService.decreaseProduct(product);
    this.discountchange('grid')
  }
  filtercate(id: any) {
    this.dataService.getMenuFilterById(id).subscribe((data: any) => this.menuData(data));
  }

  //////////////////////////////////////////////////api call/////////////////////////////////////////

  getCounterBillData(Bill_id: any) {
    this.dataService
      .getBillByBillID(Bill_id)
      .subscribe((data) => this.billdata(data));
  }
  billdata(data: any) {
    let datalist = data[0];
    if(datalist.bill_status ==='couter'){
      let datalistvalue =  JSON.parse(datalist.bill_order)
      this.dataService.productList.next(datalistvalue.bill_order.items);
    }
    if (datalist && datalist.bill_order) {
      this.updateData = JSON.parse(datalist.bill_order);
      this.billupdate = this.updateData.bill_order;
      this.ListViewTotalBill = this.updateData.ListViewTotalBill;
      this.formcall();
    }
  }
  getmenuData() {
    this.dataService.getMenuInfo().subscribe((data) => this.menuData(data));
  }
  menuData(data: any) {
    for (var i = 0; i < data.length; i++) {
      data[i].qty = 1;
      data[i].total = data[i].menu_price;
    }
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
  /////////////////////////////////////////////////////////////////////////.//////////////////////////////////////////////
  formcall() {
    this.orderForm = new FormGroup({
      items: new FormArray([]),
      cutomer_number: new FormControl('', [
      ]),
      cutomer_name: new FormControl('', [

      ]),
      cutomer_address: new FormControl('', [
      ]),
      
      discount: new FormControl( '', [Validators.pattern(this.dataService.phoneValidation()),Validators.maxLength(20)]),
      delivery_charge: new FormControl('', [
      ]),
      token_no: new FormControl('', [
      ]),
      payment_type: new FormControl('UPI', [
      ]),
    });
    this.addItem();
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      qty: [1, Validators.required],
      price: ['', Validators.required],
      itemprice: ['', Validators.required],
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
  //////////////////////////////////////////////////////////////////////////////./////////////////////////////////////////////

  discountchange(view:any){
    if(view === 'grid'){
      this.updateCart();
      this. discount = this.orderForm.controls['discount'].value;
      if(this.discount < this.allProductsDesktopTotal  ){
        this.allProductsDesktopTotal = this.allProductsDesktopTotal -  this.discount ;
      }
      else{
        this.allProductsDesktopTotal =0;
      }
    }
  }

  discountListchange(){
    this.discount = this.orderForm.controls['discount'].value;
    if(this.discount < this.ListViewTotalBill  ){
    this.GrandtotalListViewbill = this.ListViewTotalBill - this.discount;
    console.log(this.GrandtotalListViewbill)
    }
    else{
      this.GrandtotalListViewbill =0;
    }
  }
  onBookChange(event: any, idx: any) {
    for (let i in this.menuDataList) {
      if (event.target .value === this.menuDataList[i].menu_name) {
        let price = this.menuDataList[i].menu_price;
        this.itemprice = this.menuDataList[i].menu_price;
        let qty = idx.controls['qty'].value;
        let totalUnitPrice = qty * price;
        idx.controls['price'].setValue(totalUnitPrice);
        idx.controls['itemprice'].setValue(price);
        this.manualView = true;
      }
      this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;
        this.myFormValueChanges$.subscribe((salesList: any) =>
          this.updateTotalUnitPrice(salesList)
        )
    }
    this.cdref.detectChanges();
    this.getmenuData();
  }

  onPriceChange(event: any, idx: any){
    let qty = idx.controls['qty'].value;
    let price = idx.controls['itemprice'].value;
    this.totalUnitPrice = qty * price;
    idx.controls['qty'].setValue(qty);
    idx.controls['price'].setValue(this.totalUnitPrice);
    this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;
    this.myFormValueChanges$.subscribe((salesList: any) =>
      this.updateTotalUnitPrice(salesList)
    )
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
  onMaualKeyUpEvent(idx: any, flag: any) {
    this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;
    this.myFormValueChanges$.subscribe((salesList: any) =>
      this.updateTotalUnitPrice(salesList)
    )
    this.qtyr = idx.controls['qty'].value
    let qty = idx.controls['qty'].value;
    let price = idx.controls['itemprice'].value;
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
   this.totalUnitPrice = this.qtyr * price;
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

  totalSum: any;
  updateTotalUnitPrice(units: any) {
    this.totalSum = 0;
    for (let i in units) {
      let totalUnitPrice = units[i].price;
      this.totalSum += totalUnitPrice;
      this.ListViewTotalBill = this.totalSum;
      this.GrandtotalListViewbill =this.totalSum;
    }
  }

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
      this.dataService.openSnackBar("* Please Select the Item", 'Dismiss');   

    }
    
  }
   generateKitchenTokenNumbers(startingNumber=1, numTokens=100) {
    let tokenNumbers = [];
    for (let i = 0; i < numTokens; i++) {
        let token = (startingNumber + i)
        tokenNumbers.push(token);
    }
    return tokenNumbers;
}
//////////////////////////////////////////////////////////////////////////////////////
  onSubmit() {
    this.validation();
    if(!this.validationvalue){
      let r = Math.random().toString(36).substring(7);
      let tableFormData = {
      user_id: this.user_id,
      bill_no: r,
      bill_order: this.orderForm.value,
      table_id: '',
      table_name: '',
      total_bill: this.GrandtotalListViewbill,
      subtotal_bill: this.ListViewTotalBill,
      bill_status: 'counterlist',
      cutomer_name: this.orderForm.controls['cutomer_name'].value,
      cutomer_number: this.orderForm.controls['cutomer_number'].value,
      create_date: new Date(),
      status: 'Ordered',
       discount: this.orderForm.controls['discount'].value,
      delivery_charge: '',
      cutomer_address: '',
      attender_name: '',
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
//////////////////////////////////////////////////////////////////////////////////////
  onDesktopBillSubmit() {
    let obj = {
      items: this.DesktopProducts
    }
    console.log(obj)
    let r = Math.random().toString(36).substring(7);
    let BillData = {
      user_id: this.user_id,
      bill_no: r,
      bill_order: obj,
      table_id: '',
      table_name: '',
      total_bill: this.allProductsDesktopTotal,
      subtotal_bill:this.subtotal,
      bill_status: 'counter',
      cutomer_name: this.orderForm.controls['cutomer_name'].value,
      cutomer_number: this.orderForm.controls['cutomer_number'].value,
      create_date: new Date(),
      status: 'Ordered',
      discount: this.orderForm.controls['discount'].value,
      delivery_charge: '',
      cutomer_address: '',
      attender_name: '',
      attender_id: 0,
      token_no:this.orderForm.controls['token_no'].value,
      payment_type:this.orderForm.controls['payment_type'].value,
    };
    this.dataService.saveBill(BillData).subscribe(
      (data: any) => this.closeDialog(data),
      (err: any) => console.log(err)
    );
  }

  closeDialog(data: any) {
    if (data.status === true) {
      this.dataService.removeAllCart();
      this.dataService.openSnackBar(data.message, 'Dismiss');
      this.router.navigateByUrl('/counterbill');
    }
  }
  openWarrning() {
    let required = {
      flag: 'warn',
      body: 'Item Name & Quantity  is Required '
    };
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      width: '300px',
      autoFocus: false,
      data: required,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.validationvalue = true;
    });
  }

  /////////////////////////////////////////////////////////////////////////////////
  close() {
    this.dataService.removeAllCart();
  }
  UpdateItem() {
    let tableFormData = {
      bill_id: this.billDataValue.bill_data,
      user_id: this.user_id,
      bill_no: this.updateData.bill_no,
      bill_order: this.orderForm.value,
      table_id: this.table_id,
      table_name: '',
      total_bill: this.ListViewTotalBill,
      bill_status: 'booked',
      cutomer_name: this.orderForm.controls['cutomer_name'].value,
      cutomer_number: this.orderForm.controls['cutomer_number'].value,
      cutomer_address: this.orderForm.controls['cutomer_address'].value,
      create_date: new Date(),
      status: 'Ordered',
      discount: '',
      delivery_charge: '20',
      token_no:this.orderForm.controls['token_no'].value,
      payment_type:this.orderForm.controls['payment_type'].value,
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
      if (result == 'yes') {
        this.dataService
          .compelteOrder(this.billDataValue.bill_data.bill_id)
          .subscribe((data: any) => this.closedeleteDialog(data));
        window.location.reload();
      }
      if (result === 'no') {
        console.log('not deleted');
      }
    });
  }
  closedeleteDialog(data: any) { }
  downloadInvoice() {
    let invoicedata = {
      order: this.updateData,
      billcounter:true,
      bill:'counter'
    };
    const dialogRef = this.dialog.open(InvoiceComponent, {
      width: '300px',
      height: '400px',
      autoFocus: false,
      data: invoicedata,
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  downloadInvoicelist() {
    let invoicedata = {
      order: this.updateData,
      billcounter:true,
      bill:'counterlist'
    };
    const dialogRef = this.dialog.open(InvoiceComponent, {
      width: '300px',
      height: '400px',
      autoFocus: false,
      data: invoicedata,
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
}
