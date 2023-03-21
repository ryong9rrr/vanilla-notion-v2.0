import { actionCreator } from '@/modules/flux'
import { IDocument } from '@/types'
import * as ActionTypes from './action-types'

export const getAllDocument = actionCreator<IDocument[]>(ActionTypes.GET_ALL_DOCUMENT)
export const getDocument = actionCreator<IDocument>(ActionTypes.GET_DOCUMENT)

export type Action = ReturnType<typeof getAllDocument> | ReturnType<typeof getDocument>
