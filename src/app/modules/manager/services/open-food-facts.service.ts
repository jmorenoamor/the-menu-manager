import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, map, retry, catchError } from 'rxjs/operators';

import { LoggingService } from 'src/app/modules/core';

import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenFoodFactsService {

  // private baseUrl: string = 'https://world.openfoodfacts.org/cgi/search.pl?search_terms=caldo%20de%20pollo%20hacendado&search_simple=1&action=process&json=1';
  private baseUrl: string = 'https://world.openfoodfacts.org/cgi/search.pl';
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

  public search(terms:string): Observable<any> {
    let url = `${this.baseUrl}/products/`;
    let params = new HttpParams()
      .set("search_terms","caldo de pollo hacendado")
      .set("search_simple", "1")
      .set("action", "process")
      .set("json", "1");

    return this.http.get<any>(url, { headers: this.headers, params: params }).pipe(
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
