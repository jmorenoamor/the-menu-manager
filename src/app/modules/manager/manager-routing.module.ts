import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "src/app/modules/auth/guards";
import { InnerGuard } from "src/app/modules/auth/guards";

import { MenuPageComponent } from './pages';
import { ProductSearchPageComponent } from './pages';

const routes: Routes = [
  {
      path: '',
      component: MenuPageComponent,
      // canActivate: [AuthGuard],
  },
  {
      path: 'products',
      component: ProductSearchPageComponent,
      // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
