import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoggingService } from 'src/app/modules/core';
import { BackendService } from 'src/app/modules/manager/services';

import { ResultList } from 'src/app/modules/core/models';
import { Recipe } from 'src/app/modules/manager/models';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent implements OnInit {

  @Output() recipeSelected: EventEmitter<any> = new EventEmitter();

  public searchResults: Recipe[];
  public searchForm: FormGroup;

  constructor(
    private logger: LoggingService,
    private backend: BackendService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      terms: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.backend.searchRecipes("").subscribe(
      (data: ResultList<Recipe>) => {
        this.searchResults = data.results;
      }
    );
  }

  public onSearch(event:any) {
    let terms = this.searchForm.value.terms;
    if (terms && terms.length >= 3) {
      this.backend.searchRecipes(this.searchForm.value.terms).subscribe(
        (data: ResultList<Recipe>) => {
          this.searchResults = data.results;
        },
        (error: any) => {
          this.logger.error("Error no contemplado.");
        }
      );
    }
  }

  public onSelect(recipe:Recipe) {
    this.recipeSelected.emit(recipe);
  }

}
