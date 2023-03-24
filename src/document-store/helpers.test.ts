import documentData from '@/@mocks/data/documents.json'
import { IDocument } from '@/models'
import { findPath } from './helpers'

const DOCUMENTS = documentData.data as IDocument[]

const findPath_TEST_CASE: [IDocument[], number, any][] = [
  [DOCUMENTS, 11111, []], // 만약 존재하지 않는 id로 진입했다면 빈 배열을 반환한다.
  [DOCUMENTS, 33702, [{ id: 33702, title: '상윤의 노션블로그' }]],
  [
    DOCUMENTS,
    43406,
    [
      { id: 33702, title: '상윤의 노션블로그' },
      { id: 43406, title: 'TILdd' },
    ],
  ],
  [
    DOCUMENTS,
    48239,
    [
      { id: 48236, title: '리팩터링 주우우우웅' },
      { id: 48238, title: '안녕안녕' },
      { id: 48239, title: '안녕안ㄴ영연ㅇㅇ' },
    ],
  ],
]

describe('documentStore test', () => {
  test('findPath() : 문서의 경로를 배열로 반환한다.', () => {
    findPath_TEST_CASE.forEach(([documents, documentId, expected]) => {
      expect(findPath(documents, documentId)).toEqual(expected)
    })
  })
})
