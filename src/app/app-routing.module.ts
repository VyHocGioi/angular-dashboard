import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertNodeComponent } from './insert-node/insert-node.component';
import { StaffNodeComponent } from './staff-node/staff-node.component';
import { TableComponent } from './table/table.component';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
// import { ParentComponent } from './parent/parent.component';

const routes: Routes = [
  // { path: '', component: TableComponent },
  // { path: 'home', component: TableComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'test', component: StaffNodeComponent },
  // { path: 'insertnode', component: InsertNodeComponent },

  { path: '', component: LoginLayoutComponent },
  { path: 'login', component: LoginLayoutComponent },
  {
    path: 'admin',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: TableComponent },
      { path: 'insertnode', component: InsertNodeComponent },
      { path: 'test', component: StaffNodeComponent },
      { path: 'logina', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },

  { path: '**', component: LoginLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
