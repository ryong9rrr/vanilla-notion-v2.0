import { Action, HandlerFn, Reducer } from './types'

export function createStore<T>(reducer: Reducer<T>) {
  let state = reducer()
  let handlers: Set<HandlerFn> = new Set()

  const dispatch = (action: Action) => {
    // isDiff는 일단 제외
    state = reducer(state, action)
    handlers.forEach((handler) => handler())
  }

  const getState = () => {
    return Object.freeze(state)
  }

  const subscribe = (handler: HandlerFn) => {
    handlers.add(handler)
  }

  const unsubscribe = (handler: HandlerFn) => {
    handlers.delete(handler)
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