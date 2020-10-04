import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

import { LoggingService } from 'src/app/modules/core';
import { BackendService } from 'src/app/modules/manager/services';

import { Recipe, Ingredient, Product } from 'src/app/modules/manager/models';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  public selectedIngredient: Ingredient;
  public ingredientForm: FormGroup;

  constructor(
    private logger: LoggingService,
    private backend: BackendService,
    private formBuilder: FormBuilder
  ) {
    this.ingredientForm = this.formBuilder.group({
      id: [''],
      amount: ['', Validators.required],
      process: ['', Validators.required],
      product: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  selectIngredient(ingredient:Ingredient) {
    this.selectedIngredient = ingredient;

    this.ingredientForm.patchValue(this.selectIngredient
    //   {
    //   id: this.impact?.id,
    //   feasibilityId: this.impact?.feasibilityId,
    //   driver: this.impact?.driver?.id,
    //   component: this.impact?.component?.id,
    //   description: this.impact?.description,
    //   complexity: this.impact?.complexity,
    //   sinergy: this.impact?.sinergy,
    //   quantity: this.impact?.quantity,
    //   meta: this.impact?.meta,
    // }
    );
  }
}
