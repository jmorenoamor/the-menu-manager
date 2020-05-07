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

}
