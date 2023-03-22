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
    case ActionTypes.GET_ALL_DOCUMENT: {
      return { ...state, documents: action.payload }
    }

    case ActionTypes.GET_DOCUMENT: {
      return { ...state, currentDocument: action.payload }
    }

    case ActionTypes.OPEN_DOCUMENT: {
      const { openDocumentsIds } = state
      openDocumentsIds.add(action.payload)
      return { ...state, openDocumentsIds }
    }

    case ActionTypes.CLOSE_DOCUMENT: {
      const { openDocumentsIds } = state
      openDocumentsIds.delete(action.payload)
      return { ...state, openDocumentsIds }
    }

    default:
      return { ...state }
  }
}
