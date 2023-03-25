import './MainPage.scss'
import { Component } from '@/@modules/core'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'
import { getDocument } from '@/apis/document'
import { getCurrentDocumentIdFromUrl } from '@/utils'

interface State {
  occurError: boolean
}

export default class MainPage extends Component<{}, State> {
  initState() {
    return {
      occurError: false,
    }
  }

  template(): string {
    const { currentDocument } = documentStore.getState()

    if (this.state.occurError) {
      return `<h1 class="occur-error">삭제되었거나 존재하지 않는 페이지입니다.</h1>`
    }

    if (!currentDocument) {
      return ``
    }

    return `
      <section>
        <div class="inner">
          <div class="title" placeholder="제목 없음" contenteditable>
            ${currentDocument.title || '제목 없음'}
          </div>
          <div class="content" placeholder="내용을 입력하세요!" contenteditable>
            ${currentDocument.content || '내용을 입력하세요.'}
          </div>
        </div>
      </section>
    `
  }

  componentWillMount() {
    this.setProvider(documentStore)
  }

  async componentDidMount() {
    const currentDocumentId = getCurrentDocumentIdFromUrl()
    if (!currentDocumentId) {
      return
    }
    try {
      const fetchedDocument = await getDocument(currentDocumentId)
      documentStore.dispatch(Actions.updateCurrentDocument(fetchedDocument))
    } catch (error) {
      this.setState({ occurError: true })
    }
  }
}
