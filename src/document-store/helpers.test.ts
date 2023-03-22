import documentData from '@/@mocks/data/documents.json'
import { IDocument } from '@/types'
import { findPath } from './helpers'

const DOCUMENTS = documentData.data as IDocument[]

describe('documentStore test', () => {
  test('findPath() 예외 처리 : 만약 존재하지 않는 id로 진입했다면 빈 배열을 반환한다.', () => {
    expect(findPath(DOCUMENTS, 11111)).toEqual([])
  })

  test('findPath() 테스트 케이스 1', () => {
    expect(findPath(DOCUMENTS, 33702)).toEqual([{ id: 33702, title: '상윤의 노션블로그' }])
  })

  test('findPath() 테스트 케이스 2', () => {
    expect(findPath(DOCUMENTS, 43406)).toEqual([
      { id: 33702, title: '상윤의 노션블로그' },
      { id: 43406, title: 'TILdd' },
    ])
  })

  test('findPath() 테스트 케이스 3', () => {
    expect(findPath(DOCUMENTS, 48239)).toEqual([
      { id: 48236, title: '리팩터링 주우우우웅' },
      { id: 48238, title: '안녕안녕' },
      { id: 48239, title: '안녕안ㄴ영연ㅇㅇ' },
    ])
  })
})
