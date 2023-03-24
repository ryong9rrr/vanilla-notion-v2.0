import { requestBuilder } from '@/@modules/http'
import { IDocument } from '@/models'

const API_END_POINT = process.env.API_END_POINT as string
const USER_NAME = process.env.USER_NAME as string

const request = requestBuilder(API_END_POINT, {
  headers: {
    'Content-Type': 'application/json',
    'x-username': USER_NAME,
  },
})

export const getAllDocument = (): Promise<IDocument[]> => {
  return request('/documents')
}

export const getDocument = (documentId: number): Promise<Required<IDocument>> => {
  return request(`/documents/${documentId}`)
}

export const createDocument = (
  parentDocumentId: null | number,
  title: string,
): Promise<IDocument> => {
  return request('/documents', {
    method: 'POST',
    body: JSON.stringify({ parent: parentDocumentId, title }),
  })
}

export const removeDocument = (documentId: number): Promise<IDocument> => {
  return request(`/documents/${documentId}`, {
    method: 'DELETE',
  })
}
