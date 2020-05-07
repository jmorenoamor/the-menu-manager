import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InnerGuard } from "src/app/modules/auth/guards";

import { LoginPageComponent } from './pages';

const routes: Routes = [
  {
    path: 'login',
    // path: 'sign-in',
    component:  LoginPageComponent,
    canActivate: [InnerGuard],
  },
  // { path:  'register', component:  RegisterComponent },
  // { path:  'forgot-password', component:  ForgotPasswordComponent },
  // { path:  'verify-email', component:  VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
