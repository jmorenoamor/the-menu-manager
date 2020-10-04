import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { ProductSearchPageComponent } from './pages/product-search-page/product-search-page.component';

import { ReactiveFormsModule } from '@angular/forms';

import { ProductSearchComponent } from './components/product-search/product-search.component';
import { RecipeSearchComponent } from './components/recipe-search/recipe-search.component';
import { MenuTableComponent } from './components/menu-table/menu-table.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';

@NgModule({
  declarations: [
    MenuPageComponent,
    ProductSearchPageComponent,
    ProductSearchComponent,
    RecipeSearchComponent,
    MenuTableComponent,
    RecipesPageComponent,
    RecipeDetailComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule
  ]
})
export class ManagerModule { }
