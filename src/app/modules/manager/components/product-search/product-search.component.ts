import { Component, OnInit } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoggingService } from 'src/app/modules/core';
import { BackendService } from 'src/app/modules/manager/services';
// import { OpenFoodFactsService } from 'src/app/modules/manager/services';

import { ResultList } from 'src/app/modules/core/models';
import { Product, ProductComponent, Unit } from 'src/app/modules/manager/models';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  public searchResults: any[];
  public searchForm: FormGroup;

  constructor(
    private logger: LoggingService,
    private backend: BackendService,
    private formBuilder: FormBuilder
    // private off: OpenFoodFactsService,
  ) {
    this.searchForm = this.formBuilder.group({
      terms: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public onSearch(event:any) {
    let terms = this.searchForm.value.terms;
    if (terms && terms.length >= 3) {
      this.backend.searchProducts(this.searchForm.value.terms).subscribe(
        (data: any) => {
          this.searchResults = data.results;
        },
        (error: any) => {
          this.logger.error("Error no contemplado.");
        }
      );
    }
  }

}
