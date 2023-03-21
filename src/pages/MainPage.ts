import './MainPage.scss'
import { View } from '@/modules/core'
import { getDocument } from '@/apis/document'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'

export default class MainPage extends View<{ occurError: boolean }> {
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
            ${currentDocument.title}
          </div>
          <div class="content" placeholder="내용을 입력하세요!" contenteditable>
            ${currentDocument.content}
          </div>
        </div>
      </section>
    `
  }

  componentWillMount() {
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
