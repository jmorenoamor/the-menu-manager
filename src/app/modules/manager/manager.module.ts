import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ProductSearchPageComponent } from './pages/product-search-page/product-search-page.component';

import { ReactiveFormsModule } from '@angular/forms';

import { ProductSearchComponent } from './components/product-search/product-search.component';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';

@NgModule({
  declarations: [
    MenuPageComponent,
    ProductSearchPageComponent,
    ProductSearchComponent,
    RecipeSearchComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule
  ]
})
export class ManagerModule { }
