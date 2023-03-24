import { DocumentState, initialState } from './state'
import { Action } from './actions'
import * as ActionTypes from './action-types'
import { findPath } from './helpers'
import { getOpenDocumentIds, setOpenDocumentIds } from '@/webStorages/openDocumentIdsStorage'

export default function reducer(
  state: DocumentState = initialState,
  action?: Action,
): DocumentState {
  if (!action) {
    return { ...state, openDocumentsIds: new Set(getOpenDocumentIds()) }
  }

  switch (action.type) {
    case ActionTypes.UPDATE_ALL_DOCUMENT: {
      return { ...state, allDocument: action.payload }
    }

    case ActionTypes.UPDATE_CURRENT_DOCUMENT: {
      const currentDocument = action.payload
      const documentPaths = findPath(state.allDocument, currentDocument.id)
      return { ...state, currentDocument, documentPaths }
    }

    case ActionTypes.TOGGLE_DOCUMENT: {
      const { openDocumentsIds } = state
      const documentId = action.payload
      if (openDocumentsIds.has(documentId)) {
        openDocumentsIds.delete(action.payload)
      } else {
        openDocumentsIds.add(action.payload)
      }
      setOpenDocumentIds(Array.from(openDocumentsIds))
      return { ...state, openDocumentsIds }
    }

    case ActionTypes.VISIT_HOME: {
      return { ...state, currentDocument: null, documentPaths: [] }
    }

    default:
      return { ...state }
  }
}
