import './SideBar.scss'
import { Component } from '@/@modules/core'
import { navigate } from '@/@modules/router'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'
import * as DocumentApis from '@/apis/document'
import { getCurrentDocumentIdFromUrl } from '@/utils'
import { DOCUMENT_FETCH_FAIL_FEEDBACK as USER_FEEDBACK } from '@/constants'
import { ROUTE_PATH } from '@/routePath'
import { Modal, SideBarTreeItem } from '.'
import { resizableColumn } from '@/@modules/resizable'
import { SIDEBAR_COMPONENT_ID_SELECTOR } from '@/App'

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

const MODAL_COMPONENT_ID_SELECTOR = 'ModalComponent'
const RESIZE_HANDLE_CLASS_SELECTOR = 'resize-handle'

interface State {
  isVisibleModal: boolean
}

export default class SideBar extends Component<{}, State> {
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

  async componentDidMount() {
    try {
      const fetchedDocuments = await DocumentApis.getAllDocument()
      documentStore.dispatch(Actions.updateAllDocument(fetchedDocuments))
    } catch (error) {
      window.alert(USER_FEEDBACK.READ)
    }
  }

  openModal() {
    this.setState({ isVisibleModal: true })
  }

  closeModal() {
    this.setState({ isVisibleModal: false })
  }

  handleClickUserHeader() {
    navigate(ROUTE_PATH.HOME)
  }

  handleClickList(documentId: number) {
    navigate(`${ROUTE_PATH.DOCUMENT_PAGE}/${documentId}`)
  }

  handleClickToggleIcon(documentId: number) {
    documentStore.dispatch(Actions.toggleDocument(documentId))
  }

  async handleClickAddIcon(documentId: number) {
    try {
      await DocumentApis.createDocument(documentId, '')
      const fetchedDocuments = await DocumentApis.getAllDocument()
      documentStore.dispatch(
        Actions.createDocumentFromParentDocument({
          documents: fetchedDocuments,
          parentDocumentId: documentId,
        }),
      )
    } catch (error) {
      window.alert(USER_FEEDBACK.CREATE)
    }
  }

  async handleClickDeleteIcon(documentId: number) {
    if (!window.confirm('정말 삭제할까요?')) {
      return
    }
    try {
      await DocumentApis.removeDocument(documentId)
      const fetchedDocuments = await DocumentApis.getAllDocument()
      documentStore.dispatch(Actions.updateAllDocument(fetchedDocuments))
    } catch (error) {
      window.alert(USER_FEEDBACK.DELETE)
      return
    }
    if (documentId === getCurrentDocumentIdFromUrl()) {
      navigate(ROUTE_PATH.HOME)
    }
  }

  async handleCreateDocumentFromRoot(title: string) {
    try {
      const newDocument = await DocumentApis.createDocument(null, title)
      const fetchedDocuments = await DocumentApis.getAllDocument()
      documentStore.dispatch(Actions.updateAllDocument(fetchedDocuments))
      navigate(`${ROUTE_PATH.DOCUMENT_PAGE}/${newDocument.id}`)
    } catch (error) {
      window.alert(USER_FEEDBACK.CREATE)
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
      defaultWidth: 240,
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
