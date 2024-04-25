import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BillComponent } from './pages/bill/bill.component';
import { ListContactBookComponent } from './pages/contact-book/list-contact-book/list-contact-book.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddTableComponent } from './pages/Table/add-table/add-table.component';
import { MenulistComponent } from './pages/Table/table/menulist/menulist.component';
import { BillCounterComponent } from './pages/bill-counter/bill-counter.component';
import { CategiresComponent } from './pages/categires/categires.component';
import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { AttenderComponent } from './pages/Table/attender/attender.component';
import { LayoutComponent } from './pages/dashbord/layout/layout.component';
import { ListBillComponent } from './pages/bill/list-bill/list-bill.component';
import { AddBillCounetrComponent } from './pages/bill-counter/add-bill-counetr/add-bill-counetr.component';
import { CreateBillComponent } from './pages/bill/create-bill/create-bill.component';
import { ForgetpassComponent } from './pages/unprotected-component/forgetpass/forgetpass.component';
import { AdminUserlistComponent } from './pages/unprotected-component/admin-userlist/admin-userlist.component';
import { HelprequestComponent } from './pages/unprotected-component/helprequest/helprequest.component';
import { ListKhataComponent } from './pages/khatabook/list-khata/list-khata.component';

const routes: Routes = [
  // { path: '', component: BillComponent  , canActivate: [AuthGuard] },
  // { path: '', redirectTo: 'bill', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent, },
  // { path: 'bill', component: BillComponent ,canActivate: [AuthGuard]},
  // { path: 'menu', component: MenulistComponent ,canActivate: [AuthGuard]},
  // { path: 'table', component: AddTableComponent ,canActivate: [AuthGuard] },
  // { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard] },
  // { path: 'contact', component: ListContactBookComponent ,canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent, },
  { path: 'forgetpassword', component: ForgetpassComponent },
  { path: 'admin', component: AdminUserlistComponent },

  
  {path: '',component: LayoutComponent,
  
  children: [
    { path: 'help', component: HelprequestComponent },

  { path: '', component: DashbordComponent  , canActivate: [AuthGuard] },
  { path: 'addcounterbill',  component: AddBillCounetrComponent , canActivate: [AuthGuard]},
  { path: 'booktable/:id',  component: CreateBillComponent , canActivate: [AuthGuard]},
  { path: 'home',  component: DashbordComponent , canActivate: [AuthGuard]},
  { path: 'tablebill', component: BillComponent , canActivate: [AuthGuard]},
  { path: 'counterbill', component: BillCounterComponent , canActivate: [AuthGuard] },
  { path: 'menu', component: MenulistComponent , canActivate: [AuthGuard] },
  { path: 'table', component: AddTableComponent  , canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  { path: 'contact', component: ListContactBookComponent, canActivate: [AuthGuard]  },
  { path: 'category', component: CategiresComponent  , canActivate: [AuthGuard] },
  { path: 'attender', component: AttenderComponent  , canActivate: [AuthGuard] },
  { path: 'tablebillList', component: ListBillComponent  , canActivate: [AuthGuard] },
  { path: 'Khatabook', component: ListKhataComponent  , canActivate: [AuthGuard] },

  
  
  
  
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
