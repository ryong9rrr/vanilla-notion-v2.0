import { IDocument } from '@/models'
import { sleep } from './utils'
import documentsData from './data/documents.json'

export const mock_getAllDocument = () => sleep<IDocument[]>(documentsData.data)

export const mock_getDocument = () =>
  sleep<Required<IDocument>>({
    id: 1,
    title: '테스트중인 타이틀',
    content: '테스트 중...\n동해물과 백두산이 마르고 닳도록~~',
    documents: [],
    updatedAt: '123',
    createdAt: '123',
  })
