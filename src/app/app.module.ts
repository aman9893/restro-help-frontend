import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterService } from './token-inter.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule





   ,MatSnackBarModule,
   ReactiveFormsModule,FormsModule,
   HttpClientModule,BrowserAnimationsModule,MatIconModule,MatButtonModule, MatInputModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterService, multi: true},],

  bootstrap: [AppComponent]
})
export class AppModule { }
