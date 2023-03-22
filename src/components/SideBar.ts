import './SideBar.scss'
import { Component } from '@/modules/core'
import SideBarTreeItem from './SideBarTreeItem'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'
import { getAllDocument } from '@/apis/document'
import { mock_getAllDocument } from '@/mocks/handlers'
import { navigate } from '@/modules/router'

const queryDocumentId = (e: Event) => {
  if (!e.target) {
    return null
  }
  const $li = (e.target as HTMLElement).closest('li')
  if (!$li) {
    return null
  }
  const documentId = ($li as HTMLElement).dataset.id

  return documentId ? parseInt(documentId, 10) : null
}

export default class SideBar extends Component {
  template(): string {
    const { documents, openDocumentsIds } = documentStore.getState()

    return `
      <nav>
        <div class="header">
          <div class="user-profile"></div>
          Yong's Notion
        </div>
        <ul>
          ${documents.map((document) => SideBarTreeItem({ document, openDocumentsIds })).join('')}
        </ul>
        <div class="actions">
          <div class="action">
            <span class="material-icons">
              add
            </span>새로운 페이지
          </div>
        </div>
        <div class="resize-handle"></div>
      </nav>
    `
  }

  componentWillMount() {
    this.setProvider(documentStore)
  }

  async componentDidMount() {
    const documents = await mock_getAllDocument()
    //const documents = await getAllDocument()
    documentStore.dispatch(Actions.getAllDocument(documents))
  }

  handleClickList(documentId: number) {
    navigate(`/document/${documentId}`)
  }

  handleAdd(documentId: number) {
    console.log(documentId)
  }

  handleDelete(documentId: number) {
    console.log(documentId)
  }

  handleToggle(documentId: number) {
    documentStore.dispatch(Actions.toggleDocument(documentId))
  }

  setEvent() {
    this.addEvent('click', '.text', (e) => {
      const documentId = queryDocumentId(e)
      if (documentId) {
        this.handleClickList(documentId)
      }
    })

    this.addEvent('click', '.add-btn', (e) => {
      const documentId = queryDocumentId(e)
      if (documentId) {
        this.handleAdd(documentId)
      }
    })

    this.addEvent('click', '.delete-btn', (e) => {
      const documentId = queryDocumentId(e)
      if (documentId) {
        this.handleDelete(documentId)
      }
    })

    this.addEvent('click', '.toggle-btn', (e) => {
      const documentId = queryDocumentId(e)
      if (documentId) {
        this.handleToggle(documentId)
      }
    })
  }
}
