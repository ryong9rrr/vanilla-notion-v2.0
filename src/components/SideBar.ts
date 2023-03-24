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
        <div class="resize-handle"></div>
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
    } catch (error) {
      window.alert(USER_FEEDBACK.DELETE)
      return
    }

    try {
      const fetchedDocuments = await DocumentApis.getAllDocument()
      documentStore.dispatch(Actions.updateAllDocument(fetchedDocuments))
    } catch (error) {
      window.alert(USER_FEEDBACK.READ)
      return
    }

    if (isNeedRedirect(documentId)) {
      navigate('/')
    }
  }

  async handleCreateNewDocumentForRoot(title: string) {
    let newDocumentId = null

    try {
      const newDocument = await DocumentApis.createDocument(null, title)
      newDocumentId = newDocument.id
    } catch (error) {
      window.alert(USER_FEEDBACK.CREATE)
      return
    }

    try {
      const fetchedDocuments = await DocumentApis.getAllDocument()
      documentStore.dispatch(Actions.updateAllDocument(fetchedDocuments))
    } catch (error) {
      window.alert(USER_FEEDBACK.READ)
      return
    }

    if (newDocumentId) {
      navigate(`${ROUTE_PATH.DOCUMENT_PAGE}/${newDocumentId}`)
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
