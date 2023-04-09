import Router from './Router'
import { ROUTE_EVENT_TYPE } from './event-type'
import { RouterStaticMethodOptions, WebApiInterface } from './types'

export const createRouter = (rootId: string, _webApiInterface: WebApiInterface = window) => {
  return Router.getInstance(rootId, _webApiInterface)
}

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
