import { IDocument } from '@/models'
import { DocumentPath } from './state'

const makePath = (document: IDocument) =>
  ({
    id: document.id,
    title: document.title,
  } as DocumentPath)

export const findPath = (allDocument: IDocument[], currentDocumentId: number): DocumentPath[] => {
  let result: DocumentPath[] | null = null

  const find = (documents: IDocument[], paths: DocumentPath[]) => {
    if (result!!) {
      return
    }
    for (const document of documents) {
      if (document.id === currentDocumentId) {
        result = [...paths, makePath(document)]
        return
      }

      find(document.documents, [...paths, makePath(document)])
    }
  }
  find(allDocument, [])
  return result || []
}
