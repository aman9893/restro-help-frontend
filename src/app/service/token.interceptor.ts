
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, retry } from 'rxjs/operators';
import {  Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, private router: Router,
    public snackBar: MatSnackBar) {}

showSuccess(message: string): void {
  this.snackBar.open(message);
}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.getToken() != null || undefined || ''){
    if (this.authService.getToken()) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
  }
}
    return next.handle(request).pipe(catchError((error:any, caught) => {
      retry(1),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // refresh token
        } else {
          return throwError(error);
        }
      })
       
        //intercept the respons error and displace it to the console
        console.log(error);
        if(error.status ===0 ){
          this.snackBar.open(error.message, 'X', {panelClass: ['error']});

        }
        this.handleAuthError(error);
        return of(error);
      }) as any);
      
  }



  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      console.log('handled error ' + err.status);
      this.router.navigate([`/login`]);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    throw err;
  }

}