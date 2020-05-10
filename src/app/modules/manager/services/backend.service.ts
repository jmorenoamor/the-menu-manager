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
export class BackendService {

  private baseUrl: string = env.backend.url;
  private retries = 1;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });
  private listHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-JSON-Server-List': 'true'
  });

  constructor(
    private http: HttpClient,
    private logger: LoggingService,
  ) {
  }

  public searchProducts(terms:string): Observable<ResultList<Product>> {
    let url = `${this.baseUrl}/products/`;
    let params = new HttpParams().set("q", terms);
    return this.http.get<ResultList<Product>>(url, { headers: this.listHeaders, params: params }).pipe(
      retry(this.retries),
      catchError(this.handleError)
    );
  }

  public getProducts(): Observable<ResultList<Product>> {
    let url = `${this.baseUrl}/products/`;
    return this.http.get<ResultList<Product>>(url, { headers: this.listHeaders }).pipe(
      retry(this.retries),
      catchError(this.handleError)
    );
  }

  public getRecipes(): Observable<ResultList<Recipe>> {
    let entity = "recipes";
    let url = `${this.baseUrl}/${entity}/`;
    return this.http.get<ResultList<Recipe>>(url, { headers: this.listHeaders }).pipe(
      retry(this.retries),
      catchError(this.handleError)
    );
  }

  public getMenu(id: number): Observable<Menu> {
    let entity = "menus";
    let url = `${this.baseUrl}/${entity}/${id}/`;
    return this.http.get<Menu>(url, { headers: this.headers }).pipe(
      retry(this.retries),
      catchError(this.handleError)
    );
  }

  public getMenuEntries(): Observable<ResultList<MenuEntry>> {
    let url = `${this.baseUrl}/menu_entries/`;
    return this.http.get<ResultList<MenuEntry>>(url, { headers: this.listHeaders }).pipe(
      retry(this.retries),
      catchError(this.handleError)
    );
  }

  private handleError = (error) => {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.logger.error(errorMessage);
    return throwError(error);
  }
}
