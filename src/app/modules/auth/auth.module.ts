import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';


@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent, ForgotPasswordPageComponent, VerifyEmailPageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
