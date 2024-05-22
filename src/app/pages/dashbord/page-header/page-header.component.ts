import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  constructor(private _location: Location) { }
  @Input() icon?: string;
  ngOnInit(): void {
  }
  backClicked() {
    this._location.back();
  }
}
