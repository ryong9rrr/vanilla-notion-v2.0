import './Header.scss'
import { Component } from '@/@modules/core'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'
import { getDocument } from '@/apis/document'

export default class Header extends Component<{}, { occurError: boolean }> {
  initState() {
    return {
      occurError: false,
    }
  }

  template(): string {
    const { documentPaths } = documentStore.getState()

    if (this.state.occurError || documentPaths.length === 0) {
      return ``
    }

    console.log(documentPaths)

    return `
      <header>
        <div class="titles">
          <div>header</div>
        </div>
        <div class="actions">
          <button>공유</button>
          <button>업데이트</button>
          <button>즐겨찾기</button>
          <button>기타</button>
        </div>
      </header>
    `
  }

  componentWillMount(): void {
    this.setProvider(documentStore)
  }

  async componentDidMount() {
    const { pathname } = window.location
    const documentId = parseInt(pathname.replace('/document/', ''), 10)
    try {
      const document = await getDocument(documentId)
      documentStore.dispatch(Actions.getDocument(document))
    } catch (error) {
      this.setState({ occurError: true })
    }
  }
}
