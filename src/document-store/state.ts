import { IDocument } from '@/types'

export type DocumentPath = Pick<IDocument, 'id' | 'title'>

export type DocumentState = {
  documents: IDocument[]
  currentDocument: IDocument | null
  openDocumentsIds: Set<number>
  documentPaths: DocumentPath[]
}

export const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
  openDocumentsIds: new Set(),
  documentPaths: [],
}
