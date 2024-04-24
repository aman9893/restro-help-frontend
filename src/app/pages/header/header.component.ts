import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  UserId: any;
  userData: any;

  constructor(public authService: AuthService, public router: Router, public dataService: DataService,private cdref: ChangeDetectorRef,) { }
  @Output() menuToggled = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.UserId = this.authService.getUserId();
    this.getResgiterDataById();
  }

  getResgiterDataById() {
    this.dataService.getAdminProfileDataById(this.UserId)
      .subscribe(
        data => this.getRegisterData(data),
      )
  }

  getRegisterData(data: any) {
    this.userData = data[0];
    this.dataService.userData = this.userData;
    this.cdref.detectChanges();

  }
  logout() {
    this.authService.logout();
  }
}
