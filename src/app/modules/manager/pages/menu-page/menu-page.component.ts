import { Component, OnInit } from '@angular/core';

import { LoggingService } from 'src/app/modules/core';
import { BackendService } from 'src/app/modules/manager/services';

import { ResultList } from 'src/app/modules/core/models';
import { MenuEntry } from 'src/app/modules/manager/models';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  public entries: MenuEntry[];

  constructor(
    private logger: LoggingService,
    private backend: BackendService,
  ) { }

  ngOnInit(): void {

    this.backend.getMenuEntries().subscribe(
      (data: ResultList<MenuEntry> ) => {
        this.entries = data.results  ;
      },
      (error: any) => {
        this.logger.error("Error no contemplado.");
      }
    );

  }

}
