import './HomePage.scss'
import { Component } from '@/@modules/core'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'

export default class HomePage extends Component {
  template(): string {
    return `
      <section>
        <h1>저의 노션 프로젝트에 방문하신 것을 환영해요 😆</h1>
        <p>안녕하세요, 프론트엔드 개발자 용상윤입니다. 반갑습니다!!</p>
        <p>이 프로젝트는 바닐라 타입스크립트로만 구현된 프로젝트에요.</p>
      </section>
    `
  }

  componentWillMount() {
    this.setProvider(documentStore)
  }

  async componentDidMount() {
    documentStore.dispatch(Actions.visitHome())
  }
}
