import './HomePage.scss'
import { Component } from '@/@modules/core'
import { documentStore } from '@/document-store'
import * as DocumentApis from '@/apis/document'
import * as Actions from '@/document-store/actions'

export default class HomePage extends Component {
  template(): string {
    return `
      <section class="home-wrapper">
        <div class='inner'>
          <h1 class="title">\<상윤의 노션\>에 방문하신 것을 환영합니다 🎉</h1>
          <div class="content">
            <p>안녕하세요, 프론트엔드 개발자 용상윤입니다. 반갑습니다!!</p>
            <p>이 프로젝트는 바닐라 타입스크립트로만 구현된 프로젝트에요.</p>
            <p>바닐라 자바스크립트로 컴포넌트 기반 렌더링을 어떻게하면 '잘' 할 수 있을지, 또 그렇게 만들어진 모듈을 '사용하는 쪽에서 어떻게 편하게' 사용할 수 있을지 고민하며 제작했어요.</p>
            <p>라우터 모듈 또한 'react-router-dom' 처럼, 구현된 컴포넌트 모듈 안에서 '편하게' 사용할 수 있는 구조로 구현했어요.</p>
            <p>각 모듈 간 의존성을 낮추는 것에도 집중했고, 중요한 로직이라고 판단된 함수나 모듈의 동작 부분에 jest와 jsdom을 사용하여 테스트코드를 작성했어요.</p>
            <p>테스트코드 작성으로 인해, 타입스크립트로의 마이그레이션과 리팩터링을 더 효율적으로 할 수 있었어요.</p>
            <p>'노션'의 몇 가지 기능을 지원하고 있어요. 자유롭게 체험해보세요! 아참, 깃허브 저장소의 코드를 본다면 더 흥미로우실 것 같아요 ☺️</p>
          </div>
        </div>
      </section>
    `
  }

  componentWillMount() {
    this.setProvider(documentStore)
  }

  async componentDidMount() {
    const documents = await DocumentApis.getAllDocument()
    documentStore.dispatch(Actions.visitHome({ documents }))
  }
}
