import './SideBar.scss'
import { Component } from '@/@modules/core'
import { navigate } from '@/@modules/router'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'
import * as DocumentApis from '@/apis/document'
import { getDocumentIdForCurrentView } from '@/utils'
import { DOCUMENT_FETCH_FAIL_FEEDBACK as USER_FEEDBACK } from '@/utils/feedbackMessages'
import { ROUTE_PATH } from '@/constants'
import Modal from './Modal'
import SideBarTreeItem from './SideBarTreeItem'

const isNeedRedirect = (removedDocumentId: number) => {
  const currentDocumentId = getDocumentIdForCurrentView()
  return currentDocumentId && currentDocumentId === removedDocumentId
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

const MODAL_COMPONENT_ID_SELECTOR = 'ModalComponent'

export default class SideBar extends Component<{}, { isVisibleModal: boolean }> {
  componentWillMount() {
    this.setProvider(documentStore)
  }

  initState() {
    return {
      isVisibleModal: false,
    }
  }

  template(): string {
    const { documents, openDocumentsIds } = documentStore.getState()

    return `
      <nav>
        <div class="header">
          <div class="user-header">
            <div class="user-profile"></div>
            Yong's Notion
          </div>
        </div>
        <ul>
          ${documents.map((document) => SideBarTreeItem({ document, openDocumentsIds })).join('')}
        </ul>
        <div class="actions">
          <div class="action add-root-btn">
            <span class="material-icons">
              add
            </span>새로운 페이지
          </div>
        </div>
        <div class="resize-handle"></div>
        <div id="${MODAL_COMPONENT_ID_SELECTOR}"></div>
      </nav>
    `
  }

  async fetchAllDocument() {
    try {
      const documents = await DocumentApis.getAllDocument()
      documentStore.dispatch(Actions.getAllDocument(documents))
    } catch (error) {
      window.alert(USER_FEEDBACK.READ)
    }
  }

  componentDidMount() {
    this.fetchAllDocument()
  }

  openModal() {
    this.setState({ isVisibleModal: true })
  }

  closeModal() {
    this.setState({ isVisibleModal: false })
  }

  handleClickUserHeader() {
    navigate(ROUTE_PATH.HOME)
    documentStore.dispatch(Actions.navigateHome())
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
      await this.fetchAllDocument()
    } catch (error) {
      window.alert(USER_FEEDBACK.CREATE)
    }
  }

  async handleClickDeleteIcon(documentId: number) {
    if (!window.confirm('정말 삭제할까요?')) {
      return
    }
    try {
      const removedDocument = await DocumentApis.removeDocument(documentId)
      await this.fetchAllDocument()
      if (isNeedRedirect(removedDocument.id)) {
        navigate('/')
      }
    } catch (error) {
      window.alert(USER_FEEDBACK.DELETE)
    }
  }

  async handleCreateNewDocumentForRoot(title: string) {
    try {
      const newDocument = await DocumentApis.createDocument(null, title)
      await this.fetchAllDocument()
      navigate(`${ROUTE_PATH.DOCUMENT_PAGE}/${newDocument.id}`)
    } catch (error) {
      window.alert(USER_FEEDBACK.CREATE)
    }
  }

  setChildren(): void {
    this.addComponent(Modal, `#${MODAL_COMPONENT_ID_SELECTOR}`, {
      isVisibleModal: this.state.isVisibleModal,
      onCloseModal: this.closeModal.bind(this),
      onCreateNewDocument: this.handleCreateNewDocumentForRoot.bind(this),
    })
  }

  setEvent() {
    this.addEvent('click', '.user-header', (e) => {
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

    this.addEvent('click', '.add-root-btn', (e) => {
      this.openModal()
    })
  }
}
