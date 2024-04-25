import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-more-hisab',
  templateUrl: './more-hisab.component.html',
  styleUrls: ['./more-hisab.component.css']
})
export class MoreHisabComponent implements OnInit {

 
  constructor(public dialogRef: MatDialogRef<MoreHisabComponent>,
    @Inject(MAT_DIALOG_DATA) public Updatedata: any, public dialog: MatDialog,
    public dataService: DataService) {
  }

  ngOnInit() {
    console.log(this.Updatedata)
  }

  CloseUpdateDialog() {
    this.dialogRef.close();
  }
}
