import { Component, OnInit } from '@angular/core';

import { LoggingService } from 'src/app/modules/core';
import { BackendService } from 'src/app/modules/manager/services';

import { ResultList } from 'src/app/modules/core/models';

import { Product, ProductProcess } from 'src/app/modules/manager/models';
import { Unit, ProductComponent } from 'src/app/modules/manager/models';
import { Ingredient, Recipe, MenuEntry, Menu } from 'src/app/modules/manager/models';

import * as moment from 'moment';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  public menu: Menu;
  public recipes: Recipe[];

  constructor(
    private logger: LoggingService,
    private backend: BackendService,
  ) { }

  ngOnInit(): void {

    this.backend.getMenu(1).subscribe(
      (data: Menu) => {
        this.menu = data;
      },
      (error: any) => {
        this.logger.error("Error no contemplado.");
      }
    );

    this.backend.getRecipes().subscribe(
      (data: ResultList<Recipe>) => {
        this.recipes = data.results;
      },
      (error: any) => {
        this.logger.error("Error no contemplado.");
      }
    );

  }

  public entriesForWeekday(entries:MenuEntry[], weekDay:number): MenuEntry[] {
    return entries.filter(entry => moment(entry.date).day() === weekDay);
  }

  public entriesForSlot(entries:MenuEntry[], slot:number): MenuEntry[] {
    return entries.filter(entry => parseInt(entry.slot) === slot);
  }

  public entriesForDaySlot(entries:MenuEntry[], weekDay:number, slot:number): MenuEntry[] {
    return entries.filter(entry => parseInt(entry.slot) === slot && moment(entry.date).day() === weekDay);
  }

  public shoppingList(entries:MenuEntry[]): Product[] {
    let list = [];
    let uniquelist = [];
    entries.forEach(entry => {
      entry.recipe.ingredients.forEach(ingredient => {
        if (uniquelist.map(i => i.product.id).includes(ingredient.product.id)) {
          let uniqueEntry = uniquelist.findIndex(e => e.product.id === ingredient.product.id);
          uniquelist[uniqueEntry].amount += ingredient.amount;
        } else {
          uniquelist.push(JSON.parse(JSON.stringify(ingredient)));
        }
        list.push(ingredient.product);
      });
    });
    return uniquelist;
    // return list;
  }
}
