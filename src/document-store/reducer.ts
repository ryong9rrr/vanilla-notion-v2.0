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

    case ActionTypes.TOGGLE_DOCUMENT: {
      const { openDocumentsIds } = state
      const documentId = action.payload
      if (openDocumentsIds.has(documentId)) {
        openDocumentsIds.delete(action.payload)
      } else {
        openDocumentsIds.add(action.payload)
      }
      return { ...state, openDocumentsIds }
    }

    default:
      return { ...state }
  }
}
