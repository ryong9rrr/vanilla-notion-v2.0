import { Action, HandlerFn, Reducer } from './types'

export function createStore<T>(reducer: Reducer<T>) {
  let state = reducer()
  let handlers: HandlerFn[] = []

  const dispatch = (action: Action) => {
    // isDiff는 일단 제외
    state = reducer(state, action)
    handlers.forEach((handler) => handler())
  }

  const getState = () => {
    return Object.freeze(state)
  }

  const subscribe = (handler: HandlerFn) => {
    handlers.push(handler)
  }

  const unsubscribe = () => {
    handlers = [] as HandlerFn[]
  }

  const store = {
    getState,
    subscribe,
    unsubscribe,
    dispatch,
  }

  return store
}

export function actionCreator<Payload = void, T extends string = string>(type: T) {
  return (payload: Payload) =>
    ({
      type,
      payload,
    } as Action)
}
