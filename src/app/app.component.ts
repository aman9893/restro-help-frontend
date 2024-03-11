import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { PrintService, UsbDriver, WebPrintDriver } from 'ng-thermal-print';
import { PrintDriver } from 'ng-thermal-print/lib/drivers/PrintDriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  status: boolean = false;
    usbPrintDriver: UsbDriver;
    webPrintDriver:any= WebPrintDriver;
    ip: string = '';

  constructor(private printService: PrintService,public authService:AuthService,public router: Router) {
      this.usbPrintDriver = new UsbDriver();
      this.printService.isConnected.subscribe(result => {
          this.status = result;
          if (result) {
              console.log('Connected to printer!!!');
          } else {
          console.log('Not connected to printer.');
          }
      });
  }

  requestUsb() {
      this.usbPrintDriver.requestUsb().subscribe(result => {
          this.printService.setDriver(this.usbPrintDriver, 'ESC/POS');
      });
  }

  connectToWebPrint() {
      this.webPrintDriver = new WebPrintDriver(this.ip);
      this.printService.setDriver(this.webPrintDriver, 'WebPRNT');
  }

  print() {
      this.printService.init()
          .setBold(true)
          .writeLine('Hello World!')
          .setBold(false)
          .feed(4)
          .cut('full')
          .flush();
  }

}
