import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BillComponent } from './pages/bill/bill.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddTableComponent } from './pages/Table/add-table/add-table.component';
import { MenulistComponent } from './pages/Table/table/menulist/menulist.component';

const routes: Routes = [
  { path: '', component: BillComponent  , canActivate: [AuthGuard] },
  { path: '', redirectTo: 'bill', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'bill', component: BillComponent ,canActivate: [AuthGuard]},
  { path: 'menu', component: MenulistComponent ,canActivate: [AuthGuard]},
  { path: 'table', component: AddTableComponent ,canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard] },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
