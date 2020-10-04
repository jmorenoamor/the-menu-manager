import { Component, OnInit } from '@angular/core';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoggingService } from 'src/app/modules/core';
import { BackendService } from 'src/app/modules/manager/services';
// import { MongoBackendService } from 'src/app/modules/manager/services';
// import { OpenFoodFactsService } from 'src/app/modules/manager/services';

import { ResultList } from 'src/app/modules/core/models';
import { Product, ProductComponent, Unit } from 'src/app/modules/manager/models';

@Component({
  selector: 'app-product-search-page',
  templateUrl: './product-search-page.component.html',
  styleUrls: ['./product-search-page.component.scss']
})
export class ProductSearchPageComponent implements OnInit {

  public searchResults: any[];
  public searchForm: FormGroup;

  constructor(
    private logger: LoggingService,
    private backend: BackendService,
    // private mongoBackend: MongoBackendService,
    private formBuilder: FormBuilder
    // private off: OpenFoodFactsService,
  ) {
    this.searchForm = this.formBuilder.group({
      terms: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.backend.searchProducts("").subscribe(
      (data: any) => this.searchResults = data.results
    );

    // this.mongoBackend.getProducts().subscribe(
    //   (data: Product[]) => this.searchResults = data
    // );
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
