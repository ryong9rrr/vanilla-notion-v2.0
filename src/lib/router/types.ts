import { View } from '../core'
import { ClassType, WebApiInterface } from '../core/types'

export type RouterStaticMethodOptions = {
  _webApiInterface: WebApiInterface
}

export type RouteTable = {
  path: string | RegExp
  viewClass: ClassType<View>
}[]
