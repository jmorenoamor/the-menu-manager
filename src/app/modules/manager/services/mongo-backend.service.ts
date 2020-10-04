import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, map, retry, catchError } from 'rxjs/operators';

import { LoggingService } from 'src/app/modules/core';

import { ResultList } from 'src/app/modules/core/models';
import { Product, ProductProcess } from 'src/app/modules/manager/models';
import { Unit, Component, ProductComponent } from 'src/app/modules/manager/models';
import { Ingredient, Recipe, MenuEntry, Menu } from 'src/app/modules/manager/models';

import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MongoBackendService {

  // private baseUrl: string = env.backend.url;
  private baseUrl: string = "http://localhost:4000/api";
  private retries = 1;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(
    private http: HttpClient,
    private logger: LoggingService,
  ) {
  }

  public getProducts(): Observable<Product[]> {
    let url = `${this.baseUrl}/products/`;
    return this.http.get(url, { headers: this.headers }).pipe(
      // map(document => {
      //   return { id: document._id, ...document }
      // })
    );
  }
}
