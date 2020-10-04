import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "src/app/modules/auth/guards";
import { InnerGuard } from "src/app/modules/auth/guards";

import { MenuPageComponent } from './pages';
import { ProductSearchPageComponent } from './pages';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';

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
  {
    path: 'recipes',
    component: RecipesPageComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: MenuPageComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
