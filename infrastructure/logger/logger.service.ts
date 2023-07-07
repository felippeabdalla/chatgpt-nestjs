import { Logger as LoggerService, Params, PinoLogger } from 'nestjs-pino';
import { AxiosResponse } from 'axios';

export class Logger extends LoggerService {
  constructor(logger: PinoLogger, { renameContext }: Params) {
    super(logger, { renameContext });
  }

  static #interceptorMessage(response: AxiosResponse) {
    return {
      request: {
        method: response?.config?.method,
        url: response?.config?.url,
        headers: response?.config?.headers,
        data: response?.config?.data,
      },
      response: {
        status: response?.status,
        statusText: response?.statusText,
        headers: response?.headers,
        data: response?.data,
      },
    };
  }

  info(message: any, ...optionalParams: any[]) {
    this.log(message, optionalParams);
  }

  log(message: any, ...optionalParams: any[]) {
    const logLevel = process.env.LOG_LEVEL;
    if (typeof logLevel !== 'string' || logLevel.includes('log')) {
      super.log(message, optionalParams);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    const logLevel = process.env.LOG_LEVEL;
    if (typeof logLevel !== 'string' || logLevel.includes('error')) {
      super.error(message, optionalParams);
    }
  }

  warn(message: any, ...optionalParams: any[]) {
    const logLevel = process.env.LOG_LEVEL;
    if (typeof logLevel !== 'string' || logLevel.includes('warn')) {
      super.warn(message, optionalParams);
    }
  }

  debug(message: any, ...optionalParams: any[]) {
    const logLevel = process.env.LOG_LEVEL;
    if (typeof logLevel !== 'string' || logLevel.includes('debug')) {
      super.log(message, optionalParams);
    }
  }

  trace(message: any, ...optionalParams: any[]) {
    const logLevel = process.env.LOG_LEVEL;
    if (typeof logLevel !== 'string' || logLevel.includes('trace')) {
      console.trace(message, optionalParams);
    }
  }

  httpException(status: number, message: any, ...optionalParams: any[]) {
    if (status >= 500) {
      this.error(message, optionalParams);
      return;
    }

    this.debug(message, optionalParams);
  }

  interceptorDebug(response: AxiosResponse) {
    this.debug(Logger.#interceptorMessage(response));
  }

  interceptorError(response: AxiosResponse) {
    this.error(Logger.#interceptorMessage(response));
  }

  interceptorServerError(response: AxiosResponse) {
    if ((response.status ?? 0) >= 500 && (response.status ?? 0) <= 599) {
      this.interceptorError(response);
    }
  }
}
