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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpdateComponent } from './pages/update/update.component';
import { TableComponent } from './pages/Table/table/table.component';
import { AddTableComponent } from './pages/Table/add-table/add-table.component';
import { MenulistComponent } from './pages/Table/table/menulist/menulist.component';
import { HeaderComponent } from './pages/header/header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ConfrimBoxComponent } from './pages/confrim-box/confrim-box.component';
import { CreateBillComponent } from './pages/bill/create-bill/create-bill.component';
import { InvoiceComponent } from './pages/bill/invoice/invoice.component';
import { ListBillComponent } from './pages/bill/list-bill/list-bill.component';
import { BillComponent } from './pages/bill/bill.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    TableComponent,
    AddTableComponent,
    MenulistComponent,
    HeaderComponent,
    ConfrimBoxComponent,
    CreateBillComponent,
    InvoiceComponent,
    ListBillComponent,
    BillComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    HttpClientModule,

   MatSnackBarModule,
   FormsModule,
   MatIconModule,MatButtonModule,
   MatSelectModule,
   MatInputModule,
   ReactiveFormsModule,
   MatChipsModule,
   MatAutocompleteModule,MatDialogModule ,MatMenuModule,

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterService, multi: true},],

  bootstrap: [AppComponent]
})
export class AppModule { }
