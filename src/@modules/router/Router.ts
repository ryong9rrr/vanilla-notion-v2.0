import { Component } from '../core'

import { ClassType, WebApiInterface } from './types'
import { ROUTE_EVENT_TYPE } from './event-type'
import { RouteTable } from './types'
import { isMatch } from './helpers'
import { validateArgIsComponent } from './validate'

export default class Router {
  private static instance: Router
  static getInstance(rootId: string, _webApiInterface: WebApiInterface) {
    if (Router.instance) {
      return this.instance
    }
    this.instance = new Router(rootId, _webApiInterface)
    return this.instance
  }

  private currentView: Component | null = null
  private rootId: string
  private webApiInterface: WebApiInterface
  private routeTable: RouteTable = []
  private notFoundViewClass: ClassType<Component> | null = null

  private constructor(rootId: string, _webApiInterface: WebApiInterface) {
    this.webApiInterface = _webApiInterface

    this.rootId = rootId

    this.webApiInterface.addEventListener('popstate', this.route.bind(this))
    this.webApiInterface.addEventListener(ROUTE_EVENT_TYPE, (e) => {
      const prevPath = this.webApiInterface.location.pathname
      const { path } = (e as CustomEvent<{ path: string }>).detail
      if (prevPath !== path) {
        this.webApiInterface.history.pushState(null, '', path)
        this.route()
      }
    })
  }

  addRoute(path: string, viewClass: ClassType<Component>) {
    validateArgIsComponent(viewClass)
    this.routeTable.push({ path, viewClass })
  }

  setNotFoundView(viewClass: ClassType<Component>) {
    validateArgIsComponent(viewClass)
    this.notFoundViewClass = viewClass
  }

  route() {
    for (const { path: configPath, viewClass } of this.routeTable) {
      if (isMatch(configPath, this.getRealPathname())) {
        this.setCurrentView(new viewClass(this.rootId))
        return
      }
    }

    if (this.notFoundViewClass) {
      this.setCurrentView(new this.notFoundViewClass(this.rootId))
      return
    }

    this.setCurrentView(null)
    this.webApiInterface.document.querySelector(this.rootId)!.innerHTML = ``
  }

  private getRealPathname() {
    return this.webApiInterface.location.pathname
  }

  private setCurrentView = (view: Component | null) => {
    if (this.currentView) {
      this.currentView._removeProvider()
    }
    this.currentView = view
  }
}
