import { ui, router } from 'sangyoon-ui'

import './SideBar.scss'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'
import * as DocumentApis from '@/apis/document'
import { extractParamsFromURL } from '@/utils'
import { ROUTE_PATH } from '@/routePath'
import { Modal, SideBarTreeItem } from '.'
import { resizableColumn } from '@/@modules/resizable'
import { SIDEBAR_COMPONENT_ID_SELECTOR } from '@/App'
import { isGuard } from '@/etc'

const MODAL_COMPONENT_ID_SELECTOR = 'ModalComponent'
const RESIZE_HANDLE_CLASS_SELECTOR = 'resize-handle'

interface State {
  isVisibleModal: boolean
}

export default class SideBar extends ui.Component<{}, State> {
  componentWillMount() {
    this.setProvider(documentStore)
  }

  initState() {
    return {
      isVisibleModal: false,
    }
  }

  template(): string {
    const { allDocument, openDocumentsIds } = documentStore.getState()

    return `
      <nav>
        <div class="header">
          <div class="user-header">
            <div class="user-profile"></div>
            Yong's Notion
          </div>
        </div>
        <ul>
          ${allDocument.map((document) => SideBarTreeItem({ document, openDocumentsIds })).join('')}
        </ul>
        <div class="actions">
          <div class="action add-root-btn">
            <span class="material-icons">
              add
            </span>새로운 페이지
          </div>
        </div>
        <div class="${RESIZE_HANDLE_CLASS_SELECTOR}"></div>
        <div id="${MODAL_COMPONENT_ID_SELECTOR}"></div>
      </nav>
    `
  }

  openModal() {
    this.setState({ isVisibleModal: true })
  }

  closeModal() {
    this.setState({ isVisibleModal: false })
  }

  handleClickUserHeader() {
    router.navigate(ROUTE_PATH.HOME)
  }

  handleClickList(documentId: number) {
    router.navigate(`${ROUTE_PATH.DOCUMENT_PAGE}/${documentId}`)
  }

  handleClickToggleIcon(documentId: number) {
    documentStore.dispatch(Actions.toggleSidebar(documentId))
  }

  async handleClickAddIcon(documentId: number) {
    try {
      await DocumentApis.createDocument(documentId, '')
    } catch (error) {
      window.alert('문서를 생성하지 못했어요. 다시 시도해주세요.')
      return
    }

    try {
      const fetchedDocuments = await DocumentApis.getAllDocument()
      documentStore.dispatch(
        Actions.createDocument({
          documents: fetchedDocuments,
          parentDocumentId: documentId,
        }),
      )
    } catch (e) {
      window.location.reload()
    }
  }

  async handleClickDeleteIcon(documentId: number) {
    if (!window.confirm('정말 삭제할까요?')) {
      return
    }
    try {
      await DocumentApis.removeDocument(documentId)
    } catch (error) {
      window.alert('문서를 삭제하는데 실패했어요. 다시 시도해주세요.')
      return
    }

    if (documentId === Number(extractParamsFromURL('/document/'))) {
      router.navigate(ROUTE_PATH.HOME)
      return
    }

    try {
      const documents = await DocumentApis.getAllDocument()
      documentStore.dispatch(Actions.fetchAllDocument(documents))
    } catch (e) {
      window.location.reload()
    }
  }

  async handleCreateDocumentFromRoot(title: string) {
    try {
      const newDocument = await DocumentApis.createDocument(null, title)
      router.navigate(`${ROUTE_PATH.DOCUMENT_PAGE}/${newDocument.id}`)
    } catch (error) {
      window.alert('문서를 생성하는데 실패했어요. 다시 시도해주세요.')
      return
    }
  }

  setChildren(): void {
    this.addComponent(Modal, `#${MODAL_COMPONENT_ID_SELECTOR}`, {
      isVisibleModal: this.state.isVisibleModal,
      onCloseModal: this.closeModal.bind(this),
      onCreateDocument: this.handleCreateDocumentFromRoot.bind(this),
    })
  }

  setEvent() {
    resizableColumn(`#${SIDEBAR_COMPONENT_ID_SELECTOR}`, `.${RESIZE_HANDLE_CLASS_SELECTOR}`, {
      minWidth: 160,
      maxWidth: 500,
    })

    this.addEvent('click', '.user-header', () => {
      this.handleClickUserHeader()
    })

    this.addEvent('click', '.text', (e) => {
      const documentId = queryDocumentId(e)
      if (documentId) {
        this.handleClickList(documentId)
      }
    })

    this.addEvent('click', '.add-btn', (e) => {
      const documentId = queryDocumentId(e)
      if (documentId) {
        this.handleClickAddIcon(documentId)
      }
    })

    this.addEvent('click', '.delete-btn', (e) => {
      const documentId = queryDocumentId(e)
      if (documentId) {
        if (isGuard(documentId)) {
          window.alert('이 문서는 삭제하지 말아주세요 ☺️')
          return
        }
        this.handleClickDeleteIcon(documentId)
      }
    })

    this.addEvent('click', '.toggle-btn', (e) => {
      const documentId = queryDocumentId(e)
      if (documentId) {
        this.handleClickToggleIcon(documentId)
      }
    })

    this.addEvent('click', '.add-root-btn', () => {
      this.openModal()
    })
  }
}

const queryDocumentId = (e: Event) => {
  if (!e.target) {
    return null
  }
  const $li = (e.target as HTMLElement).closest('li')
  if (!$li) {
    return null
  }
  const documentId = $li.dataset.id
  return documentId ? parseInt(documentId, 10) : null
}
