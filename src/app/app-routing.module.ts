import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "src/app/modules/auth/guards/auth.guard";

const routes: Routes = [
  {
    path: 'menu',
    loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
