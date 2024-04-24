import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DataService } from 'src/app/service/data.service';
import { ConfrimBoxComponent } from '../../confrim-box/confrim-box.component';
import { AuthService } from 'src/app/auth.service';

class Invoice {
  customerName!: string;
  address!: string;
  contactNo!: number;
  email!: string;

  products: any[] = [];
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
  userdata: any;
  user_id: any;
  

  constructor(
    public dialogRef: MatDialogRef<InvoiceComponent>, public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public tabledata: any, public dialog: MatDialog, public authService: AuthService,
  ) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    this.user_id = this.authService.getUserId();
  }
  ngOnInit() {
    if (this.tabledata.billcounter) {
      this.getBillData(this.tabledata.order)
    }
    else {
      this.getTableBillData(this.tabledata.tableid);
    }
      this.userdata = this.dataService.userData;
  }
  getTableBillData(id: any) {
    this.dataService
      .getBillByTableID(id)
      .subscribe((data) => this.tableData(data));
  }
  tableData(data: any) {
    let datalist = data[0];
    if (datalist && datalist.bill_order) {

      this.updateData = JSON.parse(datalist.bill_order);
      this.billupdate = this.updateData.bill_order;
      this.invoice.products = this.billupdate.items
    }
  }

  getBillData(id: any) {
    this.dataService
      .getBillByBillID(id)
      .subscribe((data) => this.BillData(data));
  }

  BillData(data: any) {
    let datalist;
    if (data) {
      datalist = data[0];
      this.updateData = JSON.parse(datalist.bill_order);
      this.billupdate = this.updateData.bill_order;
      this.invoice.products = this.billupdate.items;
    }
  }

  close() {
    this.dialogRef.close();
  }

  invoice = new Invoice();
  generatePDF(action: any, type: any) {

    if (type === 'counterlist') {
      this.docDefinition = {
        content: [
          {
            text: 'INVOICE',
            fontSize: 20,
            bold: true,
            alignment: 'center',
            decoration: 'underline',
            color: 'black'
          },
          {
            text: this.userdata.company_name,
            fontSize: 16,
            alignment: 'center',
            color: '#047886'
          },

          {
            text: 'Customer Details',
            style: 'sectionHeader'
          },
          {
            columns: [
              [
                {
                  text: `Customer : ${this.updateData.cutomer_name}`,
                  bold: true
                },
                {
                  text: `Customer Number: ${this.updateData.cutomer_number}`,
                  bold: true
                },
                { text: `Payment Type : ${ this.updateData.payment_type }`,
                bold: true,
              }
              ],
              [
                {
                  text: `Bill No : ${this.updateData.bill_no}`,
                  alignment: 'right'
                },
                {
                  text: `Date: ${new Date(this.updateData.create_date).toLocaleString()}`,
                  alignment: 'right'
                },
                {
                  text: `Restro No : ${this.userdata.phone_number}`,
                  alignment: 'right'
                },
                {
                  text: `Restro Address : ${this.userdata.shop_address}`,
                  alignment: 'right'
                },

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
                ...this.invoice.products.map(p => ([p.name, p.itemprice, p.qty,p.price])),
                [{text: 'Sub Total', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.itemprice), 0)  +' Rs'],
                [{text: 'Discount Amount', colSpan: 3}, {}, {}, - this.updateData.discount +' Rs'],
                [{text: 'Grand Total', colSpan: 3}, {}, {}, this.updateData.total_bill+' Rs'],
              ]
              
            },
            
          },
   
          {
            text: this.invoice.additionalDetails,
            margin: [0, 0, 0, 15]
          },
          {
            columns: [
              [{ text: 'Signature', alignment: 'right', italics: true }],
            ]
          },
          {
            ul: [
              'Thanks For Visting   and will come back again!',
            ],
          }
        ],
        styles: {
          sectionHeader: {
            bold: true,
            decoration: 'underline',
            fontSize: 14,
            margin: [0, 15, 0, 15]
          }
        }
      };
    }
    if (type === 'counter') {
      this.docDefinition = {
        content: [
          {
            text: 'INVOICE',
            fontSize: 20,
            bold: true,
            alignment: 'center',
            decoration: 'underline',
            color: 'black'
          },
          {
            text: this.userdata.company_name,
            fontSize: 16,
            alignment: 'center',
            color: '#047886'
          },
        
          {
            text: 'Customer Details',
            style: 'sectionHeader'
          },
          {
            columns: [
              [
                {
                  text: `Customer Name : ${this.updateData.cutomer_name}`,
                  bold: true
                },
                { text: `Customer Number : ${ this.updateData.cutomer_number }`,
                  bold: true,
               },
               { text: `Payment Type : ${ this.updateData.payment_type }`,
                  bold: true,
                }
              ],
              [
                {
                  text: `Invoice No : ${this.updateData.bill_no}`,
                  alignment: 'right'
                },
                {
                  text: `Date: ${new Date(this.updateData.create_date).toLocaleString()}`,
                  alignment: 'right'
                },
                {
                  text: `Restro No : ${this.userdata.phone_number}`,
                  alignment: 'right'
                },
                {
                  text: `Restro Address : ${this.userdata.shop_address}`,
                  alignment: 'right'
                },

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
                  ...this.invoice.products.map(p => ([p.menu_name, p.menu_price, p.qty,p.total ])),
                  [{text: 'Sub Total', colSpan: 3}, {}, {}, this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.menu_price), 0)  +' Rs'],
                [{text: 'Discount Amount', colSpan: 3}, {}, {}, - this.updateData.discount +' Rs'],
                [{text: 'Grand Total', colSpan: 3}, {}, {}, this.updateData.total_bill+' Rs'],
                ]
              }
            },
          
          {
            text: this.invoice.additionalDetails,
            margin: [0, 0, 0, 15]
          },
          {
            columns: [
              [{ text: 'Signature', alignment: 'right', italics: true }],
            ]
          },
          {
            ul: [
              'We sincerely hope you enjoyed your Food and will come back again!',
            ],
          }
        ],
        styles: {
          sectionHeader: {
            bold: true,
            decoration: 'underline',
            fontSize: 14,
            margin: [0, 15, 0, 15]
          }
        }
      };
    }
    if (action === 'Download') {
      pdfMake.createPdf(this.docDefinition).download();

    } else if (action === 'Print') {
      pdfMake.createPdf(this.docDefinition).print();
    } else {
      pdfMake.createPdf(this.docDefinition).open();
    }
  }



  CompletedUserOrder(bill_no:any) {
    let deletedata = {
      body: 'Are you sure  Completed the Order',
    };
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      width: '300px',
      autoFocus: false,
      data: deletedata,
    });

    dialogRef.afterClosed().subscribe((result) => {
      let tableFormData = {
        table_id:'',
        table_name:'',
        bill_no:bill_no,
        bill_status:'completeorder',

      };
      if (result === 'yes') {
        this.dataService
          .compelteOrder(tableFormData)
          .subscribe((data: any) => this.closedeleteDialog(data));
          this.dialogRef.close();
         window.location.reload();
      }
      if (result === 'no') {
        this.dialogRef.close();
      }
    });
  }
  closedeleteDialog(data: any) {
  }
}
