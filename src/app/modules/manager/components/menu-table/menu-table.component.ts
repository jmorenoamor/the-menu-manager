import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LoggingService } from 'src/app/modules/core';
import { BackendService } from 'src/app/modules/manager/services';

import { ResultList } from 'src/app/modules/core/models';
import { Product, ProductProcess } from 'src/app/modules/manager/models';
import { Unit, ProductComponent } from 'src/app/modules/manager/models';
import { Ingredient, Recipe, MenuEntry, Menu } from 'src/app/modules/manager/models';

import * as moment from 'moment';

@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.scss']
})
export class MenuTableComponent implements OnInit {

  @Input() year: number;
  @Input() week: number;
  @Input() entries: MenuEntry[];

  @Output() entryAdded: EventEmitter<any> = new EventEmitter();
  @Output() entryDeleted: EventEmitter<any> = new EventEmitter();

  public fromDate: moment.Moment;
  public toDate: moment.Moment;

  constructor(
    private logger: LoggingService,
    private backend: BackendService,
  ) { }

  ngOnInit(): void {

    this.fromDate = moment().year(this.year).isoWeek(this.week).startOf('isoWeek');
    this.toDate = moment().year(this.year).isoWeek(this.week).endOf('isoWeek');

  }

}
