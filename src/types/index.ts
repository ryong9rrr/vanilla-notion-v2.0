export type IDocument = {
  id: number
  title: string
  content?: string
  documents: IDocument[]
  createdAt: string
  updatedAt: string
}
