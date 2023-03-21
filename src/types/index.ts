export type IDocument = {
  id: number
  title: string
  content: string
  documents: IDocument[]
  createdAt: Date
  updatedAt: Date
}
