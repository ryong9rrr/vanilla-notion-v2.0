import { Component } from '../core'

import { ClassType, WebApiInterface } from './types'
import { ROUTE_EVENT_TYPE } from './constants'
import { RouterStaticMethodOptions, RouteTable } from './types'
import { isMatch } from './utils'
import { validateArgIsComponent } from './validate'

export const navigate: (path: string, options?: RouterStaticMethodOptions) => void = (
  path,
  options = {
    _webApiInterface: window,
  } as RouterStaticMethodOptions,
) => {
  if (options._webApiInterface.location.pathname !== path) {
    options._webApiInterface.dispatchEvent(
      new CustomEvent(ROUTE_EVENT_TYPE, {
        detail: {
          path,
        },
      }),
    )
  }
}

export const goBack: (options?: RouterStaticMethodOptions) => void = (
  options = {
    _webApiInterface: window,
  } as RouterStaticMethodOptions,
) => {
  options._webApiInterface.history.back()
}

class Router {
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
      const { path } = (e as CustomEvent<{ path: string }>).detail
      if (path) {
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
    this.removePrevViewProvider()

    const { pathname: realPath } = this.webApiInterface.location

    for (const { path, viewClass } of this.routeTable) {
      if (isMatch(path, realPath)) {
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

  private setCurrentView(view: Component | null) {
    this.currentView = view
  }

  private removePrevViewProvider() {
    const prevView = this.currentView
    if (!prevView) {
      return
    }

    prevView._removeProvider()
  }
}

export const createRouter = (rootId: string, _webApiInterface: WebApiInterface = window) => {
  return Router.getInstance(rootId, _webApiInterface)
}
