import { DocumentState, initialState } from './state'
import { Action } from './actions'
import * as ActionTypes from './action-types'
import { findPath } from './helpers'
import { getOpenDocumentIds, setOpenDocumentIds } from '@/web-storages/openDocumentIdsStorage'

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

    case ActionTypes.VISIT_MAIN_PAGE: {
      const { documents: allDocument, currentDocument } = action.payload
      const documentPaths = findPath(allDocument, currentDocument.id)
      return { ...state, allDocument, currentDocument, documentPaths }
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

    case ActionTypes.CREATE_DOCUMENT_FROM_PARENT_DOCUMENT: {
      const { documents, parentDocumentId } = action.payload
      const { openDocumentsIds } = state
      openDocumentsIds.add(parentDocumentId)
      setOpenDocumentIds(Array.from(openDocumentsIds))
      return { ...state, allDocument: documents, openDocumentsIds }
    }

    case ActionTypes.VISIT_HOME: {
      const { documents: allDocument } = action.payload
      return { ...state, currentDocument: null, documentPaths: [], allDocument }
    }

    default:
      return { ...state }
  }
}
