import { actionCreator } from '@/@modules/flux'
import { IDocument } from '@/models'
import * as ActionTypes from './action-types'

export const fetchAllDocument = actionCreator<typeof ActionTypes.FETCH_ALL_DOCUMENT, IDocument[]>(
  ActionTypes.FETCH_ALL_DOCUMENT,
)

export const toggleSidebar = actionCreator<typeof ActionTypes.TOGGLE_SIDEBAR, number>(
  ActionTypes.TOGGLE_SIDEBAR,
)

export const visitHome = actionCreator<
  typeof ActionTypes.VISIT_HOME,
  {
    documents: IDocument[]
  }
>(ActionTypes.VISIT_HOME)

export const createDocument = actionCreator<
  typeof ActionTypes.CREATE_DOCUMENT,
  {
    documents: IDocument[]
    parentDocumentId: number
  }
>(ActionTypes.CREATE_DOCUMENT)

export const visitMainPage = actionCreator<
  typeof ActionTypes.VISIT_MAIN_PAGE,
  {
    documents: IDocument[]
    currentDocument: IDocument
  }
>(ActionTypes.VISIT_MAIN_PAGE)

export type Action =
  | ReturnType<typeof fetchAllDocument>
  | ReturnType<typeof toggleSidebar>
  | ReturnType<typeof visitHome>
  | ReturnType<typeof createDocument>
  | ReturnType<typeof visitMainPage>
