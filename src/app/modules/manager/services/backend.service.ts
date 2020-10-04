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
    let entity = "products";
    let url = `${this.baseUrl}/${entity}/`;
    let params = new HttpParams().set("q", terms);
    return this.http.get<ResultList<Product>>(url, { headers: this.listHeaders, params: params }).pipe(
      retry(this.retries),
      catchError(this.handleError)
    );
  }

  public searchRecipes(terms:string): Observable<ResultList<Recipe>> {
    let entity = "recipes";
    let url = `${this.baseUrl}/${entity}/`;
    let params = new HttpParams().set("q", terms);
    return this.http.get<ResultList<Recipe>>(url, { headers: this.listHeaders, params: params }).pipe(
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

  public updateMenu(menu:Menu): Observable<Menu> {
    let resource = "menus";
    let url = `${this.baseUrl}/${resource}/${menu.id}/`;
    return this.http.put<Menu>(url, JSON.stringify(menu), { headers: this.headers }).pipe(
      retry(this.retries),
      map(response => response),
      catchError(this.handleError)
    );
  }

  public getMenuEntries(menu:Menu, fromDate:string, toDate:string): Observable<ResultList<MenuEntry>> {
    let resource = "menu_entries";
    let url = `${this.baseUrl}/${resource}/`;

    let params = new HttpParams()
      .set("menu", menu.id.toString())
      .set("date_gte", fromDate)
      .set("date_lte", toDate);

    return this.http.get<ResultList<MenuEntry>>(url, { headers: this.listHeaders, params: params }).pipe(
      retry(this.retries),
      catchError(this.handleError)
    );
  }

  public findMenuEntries(): Observable<ResultList<MenuEntry>> {
    let resource = "menu_entries";
    let url = `${this.baseUrl}/${resource}/`;

    let params = new HttpParams();

    return this.http.get<ResultList<MenuEntry>>(url, { headers: this.listHeaders, params: params }).pipe(
      retry(this.retries),
      catchError(this.handleError)
    );
  }

  public createMenuEntry(entry:MenuEntry): Observable<MenuEntry> {
    entry.id = Math.floor(Math.random() * (20000 - 10001)) + 10000;

    let resource = "menu_entries";
    let url = `${this.baseUrl}/${resource}/`;
    return this.http.post<MenuEntry>(url, JSON.stringify(entry), { headers: this.headers }).pipe(
      retry(this.retries),
      catchError(this.handleError)
    );
  }

  public deleteMenuEntry(entry:MenuEntry): Observable<MenuEntry> {
    let resource = "menu_entries";
    let url = `${this.baseUrl}/${resource}/${entry.id}/`;
    return this.http.delete<MenuEntry>(url, { headers: this.headers }).pipe(
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
