import type { Element } from 'webdriverio';

declare module '@wdio/globals' {
  interface Browser {
    /**
     * Wait until a condition is true
     * @param condition - function returning a truthy value or Promise
     * @param options - timeout, interval, timeoutMsg
     */
    waitUntil<T>(condition: () => Promise<T> | T, options?: {
      timeout?: number;
      interval?: number;
      timeoutMsg?: string;
    }): Promise<T>;
  }
}
