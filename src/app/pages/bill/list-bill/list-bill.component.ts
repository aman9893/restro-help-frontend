import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent implements OnInit {

  menuDataList: any;
  user_id: any;
  menuItem:any=[];
  value: any;
  table_id: any;
  constructor(public dataService :DataService,
     public authService:AuthService,
     public dialogRef: MatDialogRef<ListBillComponent>,
    @Inject(MAT_DIALOG_DATA) public tabledata: any) {}
  
    ngOnInit() {
      let UserId = this.authService.getUserId();
      console.log(UserId);
      this.user_id = UserId;
      this.table_id =this.tabledata.table_id
      this.getTableData();

    }
    getTableData() {
      this.dataService.getBillByTableID(this.table_id).subscribe((data) => this.menuData(data));
    }
    menuData(data:any){
      let datalist =data[0]
      if(datalist && datalist.bill_order){
        this.menuDataList = JSON.parse(datalist.bill_order);
        console.log( this.menuDataList)
      }
   
    }
    close(){
      this.dialogRef.close();
    }
}
