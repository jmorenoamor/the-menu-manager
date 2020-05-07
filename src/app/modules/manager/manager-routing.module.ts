import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPageComponent } from './pages';

const routes: Routes = [
  {
      path: '',
      component: MenuPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
