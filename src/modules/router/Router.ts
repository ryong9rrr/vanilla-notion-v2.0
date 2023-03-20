import { View } from '../core'
import { ClassType, WebApiInterface } from '../core/types'
import * as CustomErrors from '../core/CustomErrors'
import { ROUTE_EVENT_TYPE } from './constants'
import { CustomEvent, RouterStaticMethodOptions, RouteTable } from './types'

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

  private rootId: string
  private webApiInterface: WebApiInterface
  private routeTable: RouteTable = []
  private notFoundViewClass: ClassType<View> | null = null

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

  addRoute(path: string | RegExp, viewClass: ClassType<View>) {
    if (Object.getPrototypeOf(viewClass) !== View) {
      throw new CustomErrors.PrototypeError(
        '두 번째 매개변수는 반드시 View 클래스의 프로토타입이어야 합니다. View 클래스를 상속한 클래스를 첫 번째 매개변수로 사용하세요.',
      )
    }
    this.routeTable.push({ path, viewClass })
  }

  setNotFoundView(viewClass: ClassType<View>) {
    if (Object.getPrototypeOf(viewClass) !== View) {
      throw new CustomErrors.PrototypeError(
        '두 번째 매개변수는 반드시 View 클래스의 프로토타입이어야 합니다. View 클래스를 상속한 클래스를 첫 번째 매개변수로 사용하세요.',
      )
    }
    this.notFoundViewClass = viewClass
  }

  route() {
    const { pathname } = this.webApiInterface.location

    for (const { path, viewClass } of this.routeTable) {
      const isMatched = typeof path === 'string' ? path === pathname : path.test(pathname)
      if (isMatched) {
        new viewClass(this.rootId)
        return
      }
    }

    if (this.notFoundViewClass) {
      new this.notFoundViewClass(this.rootId)
      return
    }

    this.webApiInterface.document.querySelector(this.rootId)!.innerHTML = ``
  }
}

export const createRouter = (rootId: string, _webApiInterface: WebApiInterface = window) => {
  return Router.getInstance(rootId, _webApiInterface)
}
