import { Injectable } from '@angular/core';


export abstract class Logger {

  public trace: any;
  public debug: any;
  public info: any;
  public warn: any;
  public error: any;

}

@Injectable(
  // { providedIn: 'root' }
)
export class LoggingService implements Logger {

  public trace: any;
  public debug: any;
  public info: any;
  public warn: any;
  public error: any;

  invokeConsoleMethod(type: string, args?: any): void {}
}
