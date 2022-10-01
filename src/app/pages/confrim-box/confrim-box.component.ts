import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confrim-box',
  templateUrl: './confrim-box.component.html',
  styleUrls: ['./confrim-box.component.css']
})
export class ConfrimBoxComponent implements OnInit {

  id: any;
  constructor(public dialogRef: MatDialogRef<ConfrimBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public confrimdata: any) { }

  ngOnInit() {
   }

   deleteResponse(data:any){
    this.dialogRef.close(data);
  }

}
