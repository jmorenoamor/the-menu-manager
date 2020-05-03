import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { LoggingService } from '../services';


@Injectable({
  providedIn: 'root'
})
export class ProfileInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private logger: LoggingService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const started = Date.now();
    let result: string;

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => result = event instanceof HttpResponse ? 'succeeded' : '',
        (error: HttpErrorResponse) => result = "failed"
      ),
      finalize(() => {
        const elapsed = Date.now() - started;
        this.logger.trace(`${request.method} "${request.urlWithParams}" ${result} in ${elapsed} ms.`);
      })
    );
  }
}
