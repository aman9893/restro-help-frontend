import { Inject, OnInit } from '@angular/core';
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
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';
import { CreateBillComponent } from '../../bill/create-bill/create-bill.component';
import { ConfrimBoxComponent } from '../../confrim-box/confrim-box.component';
import { InvoiceComponent } from '../../bill/invoice/invoice.component';
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
  total_bill = 0;
  itemstable: any;
  Bill_id: any;
  term: any;
  listView: boolean = false;
  GirdView: boolean = true;
  categoryDataList: any;
  conatctBookList: any;
  discount: any;
  taxvalue: any;
  subtotal: number=0;
  allSubtotal: number=0;
  mobileview: boolean= false;
  validationvalue: boolean = true;

  constructor(
    public dataService: DataService,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public dialogRef: MatDialogRef<CreateBillComponent>,
    @Inject(MAT_DIALOG_DATA) public billDataValue: any,
    public dialog: MatDialog
  ) {
    this.user_id = this.authService.getUserId();
  }

  ngOnInit() {
    console.log(this.dataService.getIsMobileResolution(),'aaa')
    this.mobileview =this.dataService.getIsMobileResolution();
    this.updateCart();
    this.getcategoryData();
    this.getConatctBookData();
    this.total_bill = 0;
    this.billflag = this.billDataValue.flag;
    this.Bill_id = this.billDataValue.bill_data;
    if (this.billflag === 'save') {
      this.getmenuData();
      this.updateCustomer();
      this.formcall();
    }
    if (this.billflag === 'update') {
      this.getCounterBillData(this.Bill_id);
      this.getmenuData();
      this.formcall();
      this.myFormValueChanges$ = this.orderForm.controls['items'].valueChanges;
    }
    if (this.billflag === 'view') {
      this.getCounterBillData(this.Bill_id);
      this.getmenuData();
      this.formcall();
    }
  }
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
  categoryData(data: any) {
    this.categoryDataList = data;
    console.log(this.categoryDataList);
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
  ontabChange(event:any){
               console.log(event.tab.textLabel)
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
  products: any = [];
  allProducts: any = 0;
  updateCart() {
    this.dataService.getProductData().subscribe(res => {
      this.products = res;
      this.allProducts = this.dataService.getTotalAmount();
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
      console.log(datalist);
      let datalistvalue =  JSON.parse(datalist.bill_order)
      this.dataService.productList.next(datalistvalue.bill_order.items);
    }
    if (datalist && datalist.bill_order) {
      this.updateData = JSON.parse(datalist.bill_order);
      this.billupdate = this.updateData.bill_order;
      this.total_bill = this.updateData.total_bill;
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

      // "cutomer_address":req.body.cutomer_address,
      //   "restro_name":req.body.restro_name,
      //   "delivery_charge":req.body.delivery_charge,
      //   "discount":req.body.discount,
      //   "status":req.body.status,
    });
   
    if (this.billflag === 'update' || this.billflag === 'view') {
      if (this.updateData && this.updateData.cutomer_name != undefined && this.billupdate && this.billupdate.items != undefined) {
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

  discountchange(view:any){
    if(view === 'grid'){
    this.updateCart();
      this. discount = this.orderForm.controls['discount'].value;
      this.allProducts = this.allProducts -  this.discount ;
    }
   else{
      this.discount = this.orderForm.controls['discount'].value;
        this.allSubtotal = this.total_bill - this.discount;
        this.total_bill =this.allSubtotal;
      }
  }
  tax(view:any){
    console.log( this.allSubtotal)
    this.taxvalue = this.orderForm.controls['delivery_charge'].value;
     if(view === 'grid' && this.allSubtotal ===0){
      this.updateCart();
      let pervalue =((this.taxvalue*this.allProducts)/100 )
      console.log(pervalue)
      this.allProducts = this.allProducts + pervalue;
    }
    else{
      this.discountchange('grid')
      let pervalue =((this.taxvalue*this.allProducts)/100 )
      this.allProducts = this.allProducts + pervalue;
    }
  }
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
    this.qtyr = idx.controls['qty'].value
    console.log(idx.controls['qty'].value)

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
      console.log(this.myFormValueChanges$.observers.length)
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
      this.total_bill = this.totalSum;
    }
  }

  validation(){
    let orderbe = this.orderForm.value;
    orderbe.items.forEach((element: any) => {
      if (element.name === '' || element.qty === 0 ||  !this.orderForm.valid) {
        this.openWarrning();
        this.validationvalue = true;
      }
      else{
        this.validationvalue = false;
      }
    })
    
  }

  //////////////////////////////////////////////////////////////////////////////////////
  onSubmit() {
    console.log(this.allSubtotal);
    if(this.allSubtotal=== 0){
      this.allSubtotal = this.total_bill;
    }
    this.validation();
    if(!this.validationvalue){
      let r = Math.random().toString(36).substring(7);
    let tableFormData = {
      user_id: this.user_id,
      bill_no: r,
      bill_order: this.orderForm.value,
      table_id: '',
      table_name: '',
      total_bill: this.allSubtotal,
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
    };
    this.dataService.saveBill(tableFormData).subscribe(
      (data: any) => this.closeDialog(data),
      (err: any) => console.log(err)
    );

    }
    
  }

  onDesktopBillSubmit() {
    console.log(this.products)
    let obj = {
      items: this.products
    }
    console.log(obj)
    let r = Math.random().toString(36).substring(7);
    let BillData = {
      user_id: this.user_id,
      bill_no: r,
      bill_order: obj,
      table_id: '',
      table_name: '',
      total_bill: this.allProducts,
      bill_status: 'counter',
      cutomer_name: this.orderForm.controls['cutomer_name'].value,
      cutomer_number: this.orderForm.controls['cutomer_number'].value,
      create_date: new Date(),
      status: 'Ordered',
      discount: this.orderForm.controls['discount'].value,
      delivery_charge: '',
      cutomer_address: '',
      attender_name: '',
      attender_id: '',
    };
    console.log(BillData)
    this.dataService.saveBill(BillData).subscribe(
      (data: any) => this.closeDialog(data),
      (err: any) => console.log(err)
    );
  }

  closeDialog(data: any) {
    console.log(data)
    if (data.status === true) {
      this.dialogRef.close(true);
      this.dataService.removeAllCart();
      this.dataService.openSnackBar(data.message, 'Dismiss');
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
    this.dialogRef.close('close');
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
      total_bill: this.total_bill,
      bill_status: 'booked',
      cutomer_name: this.orderForm.controls['cutomer_name'].value,
      cutomer_number: this.orderForm.controls['cutomer_number'].value,
      cutomer_address: this.orderForm.controls['cutomer_address'].value,
      create_date: new Date(),
      status: 'Ordered',
      discount: '',
      delivery_charge: '20'
    };
    console.log(tableFormData)
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
        console.log(this.billDataValue)
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
