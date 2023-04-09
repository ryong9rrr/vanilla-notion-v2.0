import { isMatch } from './utils'

// [realPath, configPath, expected]
const testForIsMatch: [string, string, boolean][] = [
  ['/', '/', true],
  ['/document/asdf', '/document/:id', true],
  ['/document', '/document/:id', false],
  ['/web', '/web', true],
  ['/web/document', '/web/document/:id', false],
  ['/web/document/123', '/web/document/:id', true],
  ['/web/document/', '/web/document', true],
  ['/web/document/123/', '/web/document/:id', true],
]

describe('validate 테스트', () => {
  test('isMatch() : 실제 페이지의 pathname과 view에 설정해둔 path를 비교해서 불리언을 반환한다.', () => {
    testForIsMatch.forEach(([realPath, configPath, expected]) => {
      expect(isMatch(configPath, realPath)).toBe(expected)
    })
  })
})
