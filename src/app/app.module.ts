import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from 'src/app/modules/core/core.module';
import { LoggingService, ConsoleLoggerService } from 'src/app/modules/core';
import { ProfileInterceptor } from 'src/app/modules/core';
import { PassthroughInterceptor } from 'src/app/modules/core';

import { environment as env } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    { provide: LoggingService, useClass: ConsoleLoggerService },
    { provide: HTTP_INTERCEPTORS, useClass: env.profile ? ProfileInterceptor : PassthroughInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
