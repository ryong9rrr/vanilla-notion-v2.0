import { actionCreator } from '@/modules/flux'
import { IDocument } from '@/types'
import * as ActionTypes from './action-types'

export const getAllDocument = actionCreator<IDocument[]>(ActionTypes.GET_ALL_DOCUMENT)
export const getDocument = actionCreator<IDocument>(ActionTypes.GET_DOCUMENT)

export const toggleDocument = actionCreator<number>(ActionTypes.TOGGLE_DOCUMENT)

export const navigateHome = actionCreator(ActionTypes.NAVIGATE_HOME)

export type Action =
  | ReturnType<typeof getAllDocument>
  | ReturnType<typeof getDocument>
  | ReturnType<typeof toggleDocument>
  | ReturnType<typeof navigateHome>
