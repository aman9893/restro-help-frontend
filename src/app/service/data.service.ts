import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { apiConfig } from '../api-path/api-config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http :HttpClient,private snackBar: MatSnackBar,) { 
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  cartDataList: any = [];
  productList = new BehaviorSubject<any>([]);



  inProduct(product:any) {
    for (let p of this.cartDataList) {
      if (p.menu_id === product.menu_id) {
        p.qty += 1;
        p.total=  parseInt(p.qty)*parseInt(p.menu_price);
        this.productList.next(this.cartDataList);
        this.getTotalAmount();
  
      }
   
  }
   
  }
 
  decreaseProduct(product:any) {
    let added = false;
    for (let  p of this.cartDataList) {
      if (p.menu_id === product.menu_id) {
        p.qty -= 1;
        if ( p.qty === 0) {
         this.removeCart(p)
				}
        this.getTotalAmount();

        this.productList.next(this.cartDataList);
        break;
      }
    }
  }
 
  // Remove product one by one
  removeCart(product: any) {
    this.cartDataList.map((a: any, index: any) => {
      if (product.menu_id === a.menu_id) {
        this.cartDataList.splice(index, 1);
      }
    })
  }

  

  getProductData() {
    return this.productList.asObservable();
  }



  // Add products to cart
  addToCart(product: any) {
    let isDuplicate = false;
    for(let i=0; i<this.cartDataList.length;i++){
       if(product.menu_id == this.cartDataList[i].menu_id){
        isDuplicate =true;
         break;
        }

   }
   if(!isDuplicate ){
    this.cartDataList.push(product);
    this.productList.next(this.cartDataList);
    this.getTotalAmount();
     }

  }

  // Calculate total amount
  getTotalAmount() {
    let totalSum = 0;
    for (let i=0; i<this.cartDataList.length;i++) {
      totalSum +=  parseInt(this.cartDataList[i].total);
    }
    return  totalSum ;

  }

  // Remove product one by one
  removeCartData(product: any) {
    this.cartDataList.map((a: any, index: any) => {
      if (product.menu_id === a.menu_id) {
        this.cartDataList.splice(index, 1);
      }
    })
  }

  // Empties the whole cart
  removeAllCart() {
    this.cartDataList = [];
    this.productList.next(this.cartDataList);
  }



  
  
  registerData(data:any) {
    return this.http.post(apiConfig.localhostUrl + apiConfig.registerData, data);
  }
  loginData(data:any) {
    return this.http.post(apiConfig.localhostUrl + apiConfig.loginData, data);
  }
  updateData(data:any) {
    return this.http.put(apiConfig.localhostUrl + apiConfig.updateUser, data);
  }
  getAdminProfileDataById(id:any){
    return this.http.get(apiConfig.localhostUrl+apiConfig.getAdminProfile + '/' + id);
   }
   forgetPassData(data:any) {
    return this.http.post(apiConfig.localhostUrl + apiConfig.forgetPasswordData, data);
  }
  updatePassword(data:any){
    return this.http.post(apiConfig.localhostUrl+apiConfig.updatePassword,data);
  }
  getAllusers(){
    return this.http.get(apiConfig.localhostUrl+apiConfig.getAllusers);
  }
//---------------------------------------------------------------------------------

  updateTable(data:any){
    return this.http.put(apiConfig.localhostUrl + apiConfig.updateTable, data);
  }
  deleteTable(id:any){
    return this.http.delete(apiConfig.localhostUrl + apiConfig.delete_table+'/'+id);
  }
  saveTable(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.addTable, data);
  }
  getTableInfo() {
    return this.http.get(apiConfig.localhostUrl + apiConfig.getTable);
  }

  getMonthlyData() {
    return this.http.get(apiConfig.localhostUrl + apiConfig.getMonthlyData);
  }
//---------------------------------------------------------------------------------
  updateAttender(data:any){
    return this.http.put(apiConfig.localhostUrl + apiConfig.update_attender, data);
  }
  deleteAttender(id:any){
    return this.http.delete(apiConfig.localhostUrl + apiConfig.delete_attender+'/'+id);
  }
  saveAttender(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.add_attender, data);
  }
  getAttenderInfo() {
    return this.http.get(apiConfig.localhostUrl + apiConfig.get_attender);
  }
//////////////////////////////menu ///////////////////////////////////
  ///////////////////////////table ////////////////////////////////////////
  updateCategory(data:any){
    return this.http.put(apiConfig.localhostUrl + apiConfig.updatecategory_list, data);
  }
  deletecategoryList(id:any){
    return this.http.delete(apiConfig.localhostUrl + apiConfig.deletecategoryList+'/'+id);
  }
  adddcategoryList(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.addcategory, data);
  }
  getcategoryList() {
    return this.http.get(apiConfig.localhostUrl + apiConfig.category_list);
  }
//////////////////////////////menu ///////////////////////////////////


  updateMenu(data:any){
    return this.http.put(apiConfig.localhostUrl + apiConfig.updateMenu, data);
  }
  deleteMenu(id:any){
    return this.http.delete(apiConfig.localhostUrl + apiConfig.deleteMenu+'/'+id);
  }
  saveMenu(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.addMenu, data);
  }
  getMenuInfo() {
    return this.http.get(apiConfig.localhostUrl + apiConfig.getMenu);
  }
  getMenuFilterById(id:any){
    return this.http.get(apiConfig.localhostUrl + apiConfig.filterMenu+'/'+id);
  }

///////////
getallcount(){
  return this.http.get(apiConfig.localhostUrl + apiConfig.getallcount);
}
///////////////////////////////////////////////////////////////////////

updateBill(data:any){
  return this.http.put(apiConfig.localhostUrl + apiConfig.updateBill, data);
}
updateTableStaus(data:any){
  return this.http.put(apiConfig.localhostUrl + apiConfig.updateBill, data);
}
deleteBill(id:any){
  return this.http.delete(apiConfig.localhostUrl + apiConfig.deleteBill+'/'+id);
}
saveBill(data:any){
  return this.http.post(apiConfig.localhostUrl + apiConfig.addBill, data);
}
getBillInfo() {
  return this.http.get(apiConfig.localhostUrl + apiConfig.getBill);
}

getTodayBillInfo() {
  return this.http.get(apiConfig.localhostUrl + apiConfig.today_bill_list);
}

compelteOrder(tableFormData:any){
  return this.http.put(apiConfig.localhostUrl + apiConfig.completeorder,tableFormData);
}

getBillByTableID(id:any){
  return this.http.get(apiConfig.localhostUrl + apiConfig.getbillByID+'/'+id);
  
}
getBillByBillID(id:any){
  return this.http.get(apiConfig.localhostUrl + apiConfig.getBillbasedBillId+'/'+id);
  
}
/////////////////////////////////////////////////////////////////////


  
getConatctList(){
  return this.http.get(apiConfig.localhostUrl+apiConfig.contactbook_list);
}
addConatctBook(data:any){
  return this.http.post(apiConfig.localhostUrl+apiConfig.addcontactBook,data);
}

 deleteConatctitem(id:any){
  return this.http.delete(apiConfig.localhostUrl+apiConfig.deleteContactList+ '/' + id);
}
updateConatactItem(data:any){
  return this.http.put(apiConfig.localhostUrl+apiConfig.update_contact_list, data);
}


openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 3000,
    panelClass: ['app-bottom-snackbar'],
  });
}

userData:any;

phoneValidation(){
  return  /^[0-9]*(\.[0-9]+)?$/;
}

numberValidation(){
  return  /^[0-9]*(\.[0-9]+)?$/;
}

emailValidation(){
 return  /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
}


private isMobileResolution: boolean = false;


public getIsMobileResolution(): boolean {
  return this.isMobileResolution;
}


//==================================khata book==============================

addKhatabookList(data:any){
  return this.http.post(apiConfig.localhostUrl+apiConfig.addkhatabook,data);
}
getKhatalist(){
  return this.http.get(apiConfig.localhostUrl+apiConfig.khatabooklist);
}

addKhataAmount(data:any){
  return this.http.post(apiConfig.localhostUrl+apiConfig.addKhataAmount,data);
}
getKhataAmountlist(id:any){
  return this.http.get(apiConfig.localhostUrl+apiConfig.khataAmountbooklist+'/'+id );
}

deleteKhataHIsab(request_id:any){
  return this.http.delete(apiConfig.localhostUrl+apiConfig.deleteKhataHisab + '/' + request_id);
}

deleteCustomer(request_id:any){
  return this.http.delete(apiConfig.localhostUrl+apiConfig.deleteKhatacustomer + '/' + request_id);
}

updatetax(data:any){
  return this.http.put(apiConfig.localhostUrl + apiConfig.updateTax, data);
}
deletetax(id:any){
  return this.http.delete(apiConfig.localhostUrl + apiConfig.deleteTax+'/'+id);
}
saveTax(data:any){
  return this.http.post(apiConfig.localhostUrl + apiConfig.addtax, data);
}
getTaxInfo() {
  return this.http.get(apiConfig.localhostUrl + apiConfig.taxBooklist);
}

}




