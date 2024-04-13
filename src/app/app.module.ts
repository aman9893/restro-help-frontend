import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { AddContactBookComponent } from './pages/contact-book/add-contact-book/add-contact-book.component';
import { ListContactBookComponent } from './pages/contact-book/list-contact-book/list-contact-book.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { BillCounterComponent } from './pages/bill-counter/bill-counter.component';
import { AddBillCounetrComponent } from './pages/bill-counter/add-bill-counetr/add-bill-counetr.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { CategiresComponent } from './pages/categires/categires.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { AttenderComponent } from './pages/Table/attender/attender.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PageHeaderComponent } from './pages/dashbord/page-header/page-header.component';
import { LayoutComponent } from './pages/dashbord/layout/layout.component';
import { MenuItemComponent } from './pages/dashbord/menu-item/menu-item.component';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './pages/dashbord/calculator/calculator.component';
import { SearchpipeComponent } from './pages/searchpipe/searchpipe.component'
import { PricingComponent } from './pages/unprotected-component/pricing/pricing.component';
import { LoginOtpComponent } from './pages/unprotected-component/login-otp/login-otp.component';
import { ForgetpassComponent } from './pages/unprotected-component/forgetpass/forgetpass.component';
import {MatRadioModule} from '@angular/material/radio';
import { AdminUserlistComponent } from './pages/unprotected-component/admin-userlist/admin-userlist.component';
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
    ProfileComponent,
    AddContactBookComponent,
    ListContactBookComponent,
    LoginOtpComponent, 
    BillCounterComponent,
    AddBillCounetrComponent,
    CategiresComponent,
    DashbordComponent,
    AttenderComponent,
    PageHeaderComponent,
    LayoutComponent,
    MenuItemComponent,
    CalculatorComponent,
    SearchpipeComponent
    ,PricingComponent,
    ForgetpassComponent,
    AdminUserlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
   MatSnackBarModule,
   FormsModule,
   MatIconModule,MatButtonModule,
   MatSelectModule,
   MatInputModule,
   ReactiveFormsModule,MatTabsModule,
   MatChipsModule,
  MatTableModule, MatPaginatorModule,
  CommonModule,
  MatAutocompleteModule,MatDialogModule ,MatMenuModule,MatSortModule,MatCardModule,
  MatSidenavModule,MatToolbarModule,MatListModule,MatExpansionModule,CanvasJSAngularChartsModule , MatRadioModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterService, multi: true},],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
