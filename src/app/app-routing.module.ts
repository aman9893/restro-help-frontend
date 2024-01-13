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

const routes: Routes = [
  // { path: '', component: BillComponent  , canActivate: [AuthGuard] },
  // { path: '', redirectTo: 'bill', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent, },
  // { path: 'bill', component: BillComponent ,canActivate: [AuthGuard]},
  // { path: 'menu', component: MenulistComponent ,canActivate: [AuthGuard]},
  // { path: 'table', component: AddTableComponent ,canActivate: [AuthGuard] },
  // { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard] },
  // { path: 'contact', component: ListContactBookComponent ,canActivate: [AuthGuard] },

  { path: '', component: BillComponent  , },
  { path: '', redirectTo: 'bill', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'bill', component: BillComponent },
  { path: 'counterbill', component: BillCounterComponent },
  { path: 'menu', component: MenulistComponent },
  { path: 'table', component: AddTableComponent  },
  { path: 'profile', component: ProfileComponent},
  { path: 'contact', component: ListContactBookComponent  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
