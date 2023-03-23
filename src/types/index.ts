export type IDocument = {
  id: number
  title: string
  content?: string | null
  documents: IDocument[]
  createdAt: string
  updatedAt: string
}
