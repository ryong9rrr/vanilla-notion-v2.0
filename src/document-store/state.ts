import { IDocument } from '@/types'

export type DocumentState = {
  documents: IDocument[]
  currentDocument: IDocument | null
}

export const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
}
