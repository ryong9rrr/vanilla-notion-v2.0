import './SideBarTreeItem.scss'
import { IDocument } from '@/types'

const isActive = (documentId: number) => {
  const { pathname } = window.location
  const id = pathname.replace('/document/', '')
  return parseInt(id, 10) === documentId
}

const hasChildren = (document: IDocument) => {
  return document.documents && document.documents.length > 0
}

export default function SideBarTreeItem(document: IDocument, depth: number = 1): string {
  return `
    <li>
      <div class="${isActive(document.id) ? 'title active' : 'title'}" style="padding-left: ${
    14 * depth
  }px;">
        <span class="material-icons">play_arrow</span>
        <span class="text">${document.title || '제목 없음'}</span>
        <div class="actions">
          <span class="material-icons">add</span>
          <span class="material-icons">delete</span>
        </div>
      </div>
      ${
        !hasChildren(document)
          ? `
        <div class="no-children" style="padding-left: ${
          14 * depth + 22
        }px;">하위 페이지가 없습니다.</div>
      `
          : ''
      }
      <ul>
        ${document.documents.map((doc) => SideBarTreeItem(doc, depth + 1)).join('')}
      </ul>
    </li>
  `
}
