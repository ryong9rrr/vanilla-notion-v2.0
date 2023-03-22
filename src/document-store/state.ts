import { IDocument } from '@/types'

export type DocumentState = {
  documents: IDocument[]
  currentDocument: IDocument | null
  openDocumentsIds: Set<number>
}

export const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
  openDocumentsIds: new Set(),
}
