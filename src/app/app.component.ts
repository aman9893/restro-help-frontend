import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs';
import { LoaderService } from './service/LoaderService';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService:AuthService,public router: Router,public loader: LoaderService,) {
    if( router.routerState.snapshot.url == '/login'){
        this.authService.logout();
    }
  }

  isLoading: Subject<boolean> = this.loader.isLoading;

}
