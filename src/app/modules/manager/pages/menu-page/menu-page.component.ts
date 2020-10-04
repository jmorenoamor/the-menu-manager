import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

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
  public entries: MenuEntry[];

  private menuId: number;
  private year: number;
  private week: number;

  public selectedDay: string;
  public selectedSlot: string;
  public selectedDate: moment.Moment;

  public fromDate: moment.Moment;
  public toDate: moment.Moment;

  constructor(
    private route: ActivatedRoute,
    private logger: LoggingService,
    private backend: BackendService,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.menuId = params.id;
    });

    this.route.queryParams.subscribe(params => {
      this.year = parseInt(params.year) || moment().year();
      this.week = parseInt(params.week) || moment().isoWeek();
    });

    this.fromDate = moment().year(this.year).isoWeek(this.week).startOf('isoWeek');
    this.toDate = moment().year(this.year).isoWeek(this.week).endOf('isoWeek');

    this.backend.getMenu(this.menuId).subscribe(
      (data: Menu) => {
        this.menu = data;
        this.backend.getMenuEntries(this.menu, moment(this.fromDate).format('YYYY-MM-DD'), moment(this.toDate).format('YYYY-MM-DD')).subscribe(
          (entries_data: ResultList<MenuEntry>) => {
            this.entries = entries_data.results;
          }
        )
      },
      (error: any) => {
        this.logger.error("Error no contemplado.");
      }
    );

    this.backend.findMenuEntries().subscribe(
      (entries: ResultList<MenuEntry>) => {
        entries.results.forEach(element => {
          this.logger.info(element);
        });
      }
    );
  }

  public entriesForWeekday(entries:MenuEntry[], weekDay:number): MenuEntry[] {
    return entries?.filter(entry => moment(entry.date).day() === weekDay);
  }

  public entriesForSlot(entries:MenuEntry[], slot:number): MenuEntry[] {
    return entries?.filter(entry => parseInt(entry.slot) === slot);
  }

  public entriesForDaySlot(entries:MenuEntry[], weekDay:number, slot:number): MenuEntry[] {
    return entries?.filter(entry => parseInt(entry.slot) === slot && moment(entry.date).isoWeekday() === weekDay);
  }

  public shoppingList(entries:MenuEntry[]): Product[] {
    let uniquelist = [];
    entries?.forEach(entry => {
      entry.recipe.ingredients.forEach(ingredient => {
        if (uniquelist.map(i => i.product.id).includes(ingredient.product.id)) {
          // this.logger.debug(`El ingrediente ${ingredient.product.name} ${ingredient.id} ya está en la lista`);
          let uniqueEntry = uniquelist.findIndex(e => e.product.id === ingredient.product.id);
          uniquelist[uniqueEntry].amount += ingredient.amount;
        } else {
          // this.logger.debug(`El ingrediente ${ingredient.product.name} ${ingredient.product.id} NO está en la lista`);
          uniquelist.push(JSON.parse(JSON.stringify(ingredient)));
        }
      });
    });
    return uniquelist;
  }

  public onSelectDaySlot(day:string, slot:string) {
    this.selectedDay = day;
    this.selectedSlot = slot;
    this.selectedDate = moment().year(this.year).isoWeek(this.week).startOf('isoWeek').day(this.selectedDay);
    this.logger.debug(`Slot selected: ` + this.selectedDate.format('YYYY-MM-DD'));
  }

  public setActiveSlotClass(day:string, slot:string) {
    return {
      "table-active": day == this.selectedDay && slot == this.selectedSlot,
    }
  }

  public onRemoveEntry(entry:MenuEntry) {
    this.backend.deleteMenuEntry(entry).subscribe(
      (data: MenuEntry) => {
        this.logger.info("Menu updated")
        this.entries.splice(this.entries.indexOf(entry), 1);
      },
    );
  }

  public onAddRecipe(recipe:Recipe) {
    let entry:MenuEntry = {
      menu: this.menu.id,
      recipe: recipe,
      slot: this.selectedSlot,
      date: this.selectedDate.format('YYYY-MM-DD'),
    };
    if (this.selectedSlot && this.selectedDay) {
      this.backend.createMenuEntry(entry).subscribe(
        (data: MenuEntry) => {
          this.entries.push(data);
          this.logger.info("Menu updated");
        }
      );
    }
  }
}
