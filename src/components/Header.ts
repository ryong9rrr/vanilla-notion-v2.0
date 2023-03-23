import './Header.scss'
import { Component } from '@/@modules/core'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'
import { getDocument } from '@/apis/document'
import { navigate } from '@/@modules/router'

const isMatch = (pathname: string) => {
  const regexp = new RegExp(/^\/document\/[\w]+\/?$/, 'g')
  return regexp.test(pathname)
}

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
  initState() {
    return {
      occurError: false,
    }
  }

  template(): string {
    const { documentPaths } = documentStore.getState()
    const { pathname } = window.location

    if (!isMatch(pathname) || this.state.occurError || documentPaths.length === 0) {
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

  componentWillMount(): void {
    this.setProvider(documentStore)
  }

  componentDidMount() {
    this.fetchPaths()
  }

  setEvent(): void {
    this.addEvent('click', '.title', (e) => {
      const documentId = queryDocumentId(e)
      if (documentId) {
        this.navigateDocument(documentId)
      }
    })
  }

  navigateDocument(documentId: number) {
    navigate(`/document/${documentId}`)
  }

  async fetchPaths() {
    const { pathname } = window.location
    if (!isMatch(pathname)) {
      return
    }
    const documentId = parseInt(pathname.replace('/document/', ''), 10)
    if (Number.isNaN(documentId)) {
      return
    }
    try {
      const document = await getDocument(documentId)
      documentStore.dispatch(Actions.getDocument(document))
    } catch (error) {
      this.setState({ occurError: true })
    }
  }
}
