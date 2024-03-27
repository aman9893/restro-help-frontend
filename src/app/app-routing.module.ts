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
  {path: '',component: LayoutComponent,
  children: [
  { path: '', component: DashbordComponent  , canActivate: [AuthGuard] },
  { path: 'home',  component: DashbordComponent},
  { path: 'tablebill', component: BillComponent },
  { path: 'counterbill', component: BillCounterComponent },
  { path: 'menu', component: MenulistComponent },
  { path: 'table', component: AddTableComponent  },
  { path: 'profile', component: ProfileComponent},
  { path: 'contact', component: ListContactBookComponent  },
  { path: 'category', component: CategiresComponent  },
  { path: 'attender', component: AttenderComponent  },
  { path: 'tablebillList', component: ListBillComponent  },
  
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
