import './SideBar.scss'
import { Component } from '@/modules/core'
import { getAllDocument } from '@/apis/document'
import { documentStore } from '@/document-store'
import * as Actions from '@/document-store/actions'

export default class SideBar extends Component {
  template(): string {
    const { documents, currentDocument } = documentStore.getState()
    console.log(documents, currentDocument)

    return `
      <nav style="{ width: 240px }">
        <div class="header">
          <div class="user-profile"></div>
          Yong's Notion
        </div>
        <ul>
          <div>워크스페이스 아이템</div>
        </ul>
        <div class="actions">
          <div class="action">
            <span class="icons">
              +
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
    const documents = await getAllDocument()
    documentStore.dispatch(Actions.getAllDocument(documents))
  }
}
