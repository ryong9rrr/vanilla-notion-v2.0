import { IDocument } from '@/models/document'

export type DocumentPath = Pick<IDocument, 'id' | 'title'>

export type DocumentState = {
  allDocument: IDocument[]
  currentDocument: IDocument | null
  openDocumentsIds: Set<number>
  documentPaths: DocumentPath[]
}

export const initialState: DocumentState = {
  allDocument: [],
  currentDocument: null,
  openDocumentsIds: new Set(),
  documentPaths: [],
}
