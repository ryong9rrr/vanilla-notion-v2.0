import { DOMWindow } from 'jsdom'
import { Component } from '../core'

export type WebApiInterface = Window | typeof globalThis | DOMWindow

export type ClassType<T, A extends any[] = any[]> = Function & {
  new (...args: A): T
}

export type RouterStaticMethodOptions = {
  _webApiInterface: WebApiInterface
}

export type RouteTable = {
  path: string
  viewClass: ClassType<Component>
}[]

export interface MyCustomEvent<T> extends CustomEvent {
  detail: T
}
