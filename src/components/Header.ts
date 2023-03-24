import './Header.scss'
import { Component } from '@/@modules/core'
import { navigate } from '@/@modules/router'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'
import { getDocument } from '@/apis/document'
import { getDocumentIdForCurrentView, isDocumentPathForCurrentView } from '@/utils'
import { ROUTE_PATH } from '@/constants'

const queryDocumentId = (e: Event) => {
  if (!e.target) {
    return null
  }
  const $button = e.target as HTMLButtonElement
  if (!$button) {
    return null
  }
  const documentId = $button.dataset.id
  return documentId ? parseInt(documentId, 10) : null
}

export default class Header extends Component<{}, { occurError: boolean }> {
  componentWillMount(): void {
    this.setProvider(documentStore)
  }

  initState() {
    return {
      occurError: false,
    }
  }

  template(): string {
    const { documentPaths } = documentStore.getState()
    if (!isDocumentPathForCurrentView() || this.state.occurError || documentPaths.length === 0) {
      return ``
    }

    return `
      <header>
        <div class="titles">
          ${documentPaths
            .map(
              (path, index) => `${index > 0 ? `<div class="division">/</div>` : ''}
              <button class="title" data-id="${path.id}">${path.title}</button>`,
            )
            .join('')}
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

  componentDidMount() {
    this.fetchPaths()
  }

  navigateDocument(documentId: number) {
    navigate(`${ROUTE_PATH.DOCUMENT_PAGE}/${documentId}`)
  }

  async fetchPaths() {
    const currentDocumentId = getDocumentIdForCurrentView()
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

  setEvent(): void {
    this.addEvent('click', '.title', (e) => {
      const documentId = queryDocumentId(e)
      if (documentId) {
        this.navigateDocument(documentId)
      }
    })
  }
}
