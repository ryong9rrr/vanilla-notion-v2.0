import { requestBuilder } from '@/modules/api'
import { IDocument } from '@/types'

const API_END_POINT = process.env.API_END_POINT as string
const USER_NAME = process.env.USER_NAME as string

const request = requestBuilder(API_END_POINT, {
  headers: {
    'Content-Type': 'application/json',
    'x-username': USER_NAME,
  },
})

export const readAllDocument = (): Promise<IDocument[]> => {
  return request('/documents')
}
