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
    case ActionTypes.GET_ALL_DOCUMENT: {
      return { ...state, documents: action.payload }
    }

    case ActionTypes.GET_DOCUMENT: {
      const currentDocument = action.payload
      const documentPaths = findPath(state.documents, currentDocument.id)
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

    case ActionTypes.NAVIGATE_HOME: {
      return { ...state, currentDocument: null, documentPaths: [] }
    }

    default:
      return { ...state }
  }
}
