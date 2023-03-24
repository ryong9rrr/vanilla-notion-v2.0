import { actionCreator } from '@/@modules/flux'
import { IDocument } from '@/types'
import * as ActionTypes from './action-types'

export const updateAllDocument = actionCreator<typeof ActionTypes.UPDATE_ALL_DOCUMENT, IDocument[]>(
  ActionTypes.UPDATE_ALL_DOCUMENT,
)
export const updateCurrentDocument = actionCreator<
  typeof ActionTypes.UPDATE_CURRENT_DOCUMENT,
  IDocument
>(ActionTypes.UPDATE_CURRENT_DOCUMENT)

export const toggleDocument = actionCreator<typeof ActionTypes.TOGGLE_DOCUMENT, number>(
  ActionTypes.TOGGLE_DOCUMENT,
)

export const navigateHome = actionCreator(ActionTypes.NAVIGATE_HOME)

export const addDocumentFromParentDocument = actionCreator<
  typeof ActionTypes.ADD_DOCUMENT_FROM_PARENT_DOCUMENT,
  {
    documents: IDocument[]
    parentDocumentId: number
  }
>(ActionTypes.ADD_DOCUMENT_FROM_PARENT_DOCUMENT)

export type Action =
  | ReturnType<typeof updateAllDocument>
  | ReturnType<typeof updateCurrentDocument>
  | ReturnType<typeof toggleDocument>
  | ReturnType<typeof navigateHome>
  | ReturnType<typeof addDocumentFromParentDocument>
