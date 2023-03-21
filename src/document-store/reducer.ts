import { DocumentState, initialState } from './state'
import { Action } from './actions'
import * as ActionTypes from './action-types'

export default function reducer(
  state: DocumentState = initialState,
  action?: Action,
): DocumentState {
  if (!action) {
    return { ...state }
  }

  switch (action.type) {
    case ActionTypes.GET_ALL_DOCUMENT:
      return { ...state, documents: action.payload }
    default:
      return { ...state }
  }
}
