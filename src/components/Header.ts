import { ui, router } from 'sangyoon-ui'

import './Header.scss'
import { documentStore } from '@/document-store'
import { ROUTE_PATH } from '@/pages/routes'

interface State {
  occurError: boolean
}

export default class Header extends ui.Component<{}, State> {
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
    if (this.state.occurError || documentPaths.length === 0) {
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

  handleClickDocumentPathTitle(documentId: number) {
    router.navigate(`${ROUTE_PATH.DOCUMENT_PAGE}/${documentId}`)
  }

  setEvent(): void {
    this.addEvent('click', '.title', (e) => {
      const documentId = queryDocumentId(e)
      if (documentId) {
        this.handleClickDocumentPathTitle(documentId)
      }
    })
  }
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
