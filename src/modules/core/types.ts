import { DOMWindow } from 'jsdom'

export type WebApiInterface = Window | typeof globalThis | DOMWindow

export type ClassType<T, A extends any[] = any[]> = Function & {
  new (...args: A): T
}

export interface Provider {
  subscribe: (fn: () => void) => void
  unsubscribe: () => void
}
