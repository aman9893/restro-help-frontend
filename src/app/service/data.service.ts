import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { apiConfig } from '../api-path/api-config';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http :HttpClient,private snackBar: MatSnackBar,) { 
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
  ///////////////////////////table ////////////////////////////////////////
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


//////////////////////////////////////////////////////////////////////////////////

updateBill(data:any){
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

compelteOrder(id:any){
  return this.http.delete(apiConfig.localhostUrl + apiConfig.deleteBill+'/'+id);
}

getBillByTableID(id:any){
  return this.http.get(apiConfig.localhostUrl + apiConfig.getbillByID+'/'+id);
  
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

}
