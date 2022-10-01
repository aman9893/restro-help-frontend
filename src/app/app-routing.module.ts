import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './pages/bill/bill.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddTableComponent } from './pages/Table/add-table/add-table.component';
import { MenulistComponent } from './pages/Table/table/menulist/menulist.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'bill', component: BillComponent },
  { path: 'menu', component: MenulistComponent },
  { path: 'table', component: AddTableComponent },
  { path: 'profile', component: ProfileComponent },

  
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
