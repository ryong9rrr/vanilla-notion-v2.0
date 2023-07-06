import { IDocument } from '@/models/document'
import { findPath } from './helpers'
import { documents as documentsData } from './data'

const testcasesForFindPath: [IDocument[], number, any][] = [
  [documentsData, 11111, []], // 만약 존재하지 않는 id로 진입했다면 빈 배열을 반환
  [documentsData, 33702, [{ id: 33702, title: '상윤의 노션블로그' }]],
  [
    documentsData,
    43406,
    [
      { id: 33702, title: '상윤의 노션블로그' },
      { id: 43406, title: 'TILdd' },
    ],
  ],
  [
    documentsData,
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
    testcasesForFindPath.forEach(([documents, documentId, expected]) => {
      expect(findPath(documents, documentId)).toEqual(expected)
    })
  })
})
