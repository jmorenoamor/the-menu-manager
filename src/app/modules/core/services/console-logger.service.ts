import { Injectable } from '@angular/core';

import { Logger } from './logging.service';

import { environment } from 'src/environments/environment';

export enum LogLevel {
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARNING = 4,
  ERROR = 5,
}

const noop = (): any => undefined;

@Injectable(
  // { providedIn: 'root' }
)
export class ConsoleLoggerService extends Logger {

  get trace() {
    if (environment.debug && environment.log_level <= LogLevel.TRACE) {
      return console.debug.bind(console);
    } else {
      return noop;
    }
  }

  get debug() {
    if (environment.debug && environment.log_level <= LogLevel.DEBUG) {
      return console.debug.bind(console);
    } else {
      return noop;
    }
  }

  get info() {
    if (environment.debug && environment.log_level <= LogLevel.INFO) {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn() {
    if (environment.debug && environment.log_level <= LogLevel.WARNING) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  get error() {
    if (environment.debug && environment.log_level <= LogLevel.ERROR) {
      return console.error.bind(console);
    } else {
      return noop;
    }
  }

  invokeConsoleMethod(type: string, args?: any): void {
    const logFn: Function = (console)[type] || console.log || noop;
    logFn.apply(console, [args]);
  }
}
