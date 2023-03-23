import './SideBar.scss'
import { Component } from '@/@modules/core'
import SideBarTreeItem from './SideBarTreeItem'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'
import { getAllDocument } from '@/apis/document'
import { navigate } from '@/@modules/router'
import Modal from './Modal'

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
        <div id="ModalComponent"></div>
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
    navigate('/')
    documentStore.dispatch(Actions.navigateHome())
  }

  handleClickList(documentId: number) {
    navigate(`/document/${documentId}`)
  }

  handleClickAddIcon(documentId: number) {
    console.log(documentId)
  }

  handleClickDeleteIcon(documentId: number) {
    console.log(documentId)
  }

  handleClickToggleIcon(documentId: number) {
    documentStore.dispatch(Actions.toggleDocument(documentId))
  }

  handleCreateNewDocumentForRoot() {
    console.log('추가!')
  }

  setChildren(): void {
    this.addComponent(Modal, '#ModalComponent', {
      isVisibleModal: this.state.isVisibleModal,
      onCloseModal: this.closeModal.bind(this),
      onCreateNewDocument: this.handleCreateNewDocumentForRoot.bind(this),
    })
  }

  async componentDidMount() {
    const documents = await getAllDocument()
    documentStore.dispatch(Actions.getAllDocument(documents))
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
