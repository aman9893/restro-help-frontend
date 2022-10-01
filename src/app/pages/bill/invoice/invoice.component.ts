import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DataService } from 'src/app/service/data.service';
class Product{
  name!: string;
  price!: number;
  qty!: number;
}
class Invoice{
  customerName!: string;
  address!: string;
  contactNo!: number;
  email!: string;
  
  products: Product[] = [];
  additionalDetails!: string;
}
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  billorder: any;
  docDefinition: any;
  updateData: any;
  table_id: any;
  billupdate: any;
    
  constructor(
    public dialogRef: MatDialogRef<InvoiceComponent>,   public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public tabledata: any,public dialog: MatDialog
  ){
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }
  ngOnInit() {
      this.table_id =this.tabledata;
      this.getTableBillData();
  }
  getTableBillData() {
    this.dataService
      .getBillByTableID(this.table_id)
      .subscribe((data) => this.tableData(data));
  }
  tableData(data: any) {
    let datalist = data[0];
    if (datalist && datalist.bill_order) {
       this.updateData = JSON.parse(datalist.bill_order);
       console.log(this.updateData)
       this.billupdate = this.updateData.bill_order;
       this.invoice.products =  this.billupdate.items
    }
  }
    close(){
      this.dialogRef.close();
    }

    invoice = new Invoice(); 
  
    generatePDF(action:any) {
       this.docDefinition = {
        content: [
          {
            text: 'ELECTRONIC SHOP',
            fontSize: 16,
            alignment: 'center',
            color: '#047886'
          },
          {
            text: 'INVOICE',
            fontSize: 20,
            bold: true,
            alignment: 'center',
        
          },
          {
            text: 'Customer Details',
            style: 'sectionHeader'
          },
          {
            columns: [
              [
                {
                  text:this.billupdate.name,
                  bold:true
                }
              ],
              [
                {
                  text: `Date: ${new Date().toLocaleString()}`,
                  alignment: 'right'
                },
                { 
                  text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                  alignment: 'right'
                }
              ]
            ]
          },
          {
            text: 'Order Details',
            style: 'sectionHeader'
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 'auto'],
              body: [
                ['Item', 'Price', 'Quantity', 'Amount'],
                ...this.invoice.products.map(p => ([p.name, p.price, p.qty, (p.price*p.qty).toFixed(2)])),
                [{text: 'Total Amount', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2)]
              ]
            }
          },
          // {
          //   // text: 'Additional Details',
          //   // style: 'sectionHeader'
          // },
          // {
          //     text: this.invoice.additionalDetails,
          //     margin: [0, 0 ,0, 15]          
          // },
          {
            columns: [
              // [{ qr: `${this.invoice.customerName}`, fit: '50' }],
              [{ text: 'Signature', alignment: 'right', italics: true}],
            ]
          },
        ],
        styles: {
          sectionHeader: {
            bold: true,
            decoration: 'underline',
            fontSize: 14,
            margin: [0, 15,0, 15]          
          }
        }
      };
      pdfMake.createPdf(this.docDefinition).download();
      if(action==='Download'){
      }else if(action === 'Print'){
        pdfMake.createPdf(this.docDefinition).print();      
      }else{
        pdfMake.createPdf(this.docDefinition).open();      
      }
    }
}
