import { View } from '../core'
import { ClassType, WebApiInterface } from '../core/types'

export type RouterStaticMethodOptions = {
  _webApiInterface: WebApiInterface
}

export type RouteTable = {
  path: string | RegExp
  viewClass: ClassType<View>
}[]

export interface CustomEvent<T> extends Event {
  detail: T
}
