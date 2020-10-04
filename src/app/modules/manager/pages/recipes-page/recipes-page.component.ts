import { Component, OnInit } from '@angular/core';

import { LoggingService } from 'src/app/modules/core';
import { BackendService } from 'src/app/modules/manager/services';

import { ResultList } from 'src/app/modules/core/models';
import { Recipe } from 'src/app/modules/manager/models';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.scss']
})
export class RecipesPageComponent implements OnInit {

  public selectedRecipe: Recipe;

  constructor(
    private logger: LoggingService,
    private backend: BackendService,
  ) {
  }

  ngOnInit(): void {
  }

  onRecipeSelected(event:any) {
    this.selectedRecipe = event;
  }
}
