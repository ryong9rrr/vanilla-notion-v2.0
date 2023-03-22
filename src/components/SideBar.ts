import './SideBar.scss'
import { Component } from '@/modules/core'
import SideBarTreeItem from './SideBarTreeItem'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'
import { getAllDocument } from '@/apis/document'
import { mock_getAllDocument } from '@/mocks/handlers'

export default class SideBar extends Component {
  template(): string {
    const { documents, currentDocument } = documentStore.getState()

    console.log(documents, currentDocument)

    return `
      <nav>
        <div class="header">
          <div class="user-profile"></div>
          Yong's Notion
        </div>
        <ul>
          ${documents.map((document) => SideBarTreeItem(document)).join('')}
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
}
