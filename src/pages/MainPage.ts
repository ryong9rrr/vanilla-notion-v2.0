import { ui } from 'sangyoon-ui'

import './MainPage.scss'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'
import * as DocumentApis from '@/apis/document'
import { extractParamsFromURL } from '@/utils'

interface State {
  occurError: boolean
}

export default class MainPage extends ui.Component<{}, State> {
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
      <section class="main-wrapper">
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
    const currentDocumentId = Number(extractParamsFromURL('/document/'))
    try {
      const documents = await DocumentApis.getAllDocument()
      const currentDocument = await DocumentApis.getDocument(currentDocumentId)
      documentStore.dispatch(
        Actions.visitMainPage({
          documents,
          currentDocument,
        }),
      )
    } catch (error) {
      this.setState({ occurError: true })
    }
  }
}
