import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterService implements HttpInterceptor {
  constructor(
    public authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  showSuccess(message: any): void {
    this.snackBar.open(message);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.getToken() != null || undefined || '') {
      if (this.authService.getToken()) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.getToken()}`,
          },
        });
      }
    }
    return next.handle(request).pipe(
      catchError((error) => {
        this.handleAuthError(error)
        return throwError(error);
      })
    );
  }

  

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      this.router.navigate([`/login`]);
      this.showSuccess(err);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    throw err;
  }
}
