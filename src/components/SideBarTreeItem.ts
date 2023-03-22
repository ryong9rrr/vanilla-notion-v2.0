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

const isShow = (documentId: number, openDocumentsIds: Set<number>) => {
  return openDocumentsIds.has(documentId)
}

export default function SideBarTreeItem(
  document: IDocument,
  openDocumentsIds: Set<number>,
  depth: number = 1,
): string {
  return `
    <li>
      <div class="title ${isActive(document.id) ? 'active' : ''}" style="padding-left: ${
    14 * depth
  }px;">
        <span class="material-icons ${
          isShow(document.id, openDocumentsIds) ? 'active' : ''
        }">play_arrow</span>
        <span class="text">${document.title || '제목 없음'}</span>
        <div class="actions">
          <span class="material-icons">add</span>
          <span class="material-icons">delete</span>
        </div>
      </div>
      ${
        !hasChildren(document) && isShow(document.id, openDocumentsIds)
          ? `
        <div class="no-children" style="padding-left: ${
          14 * depth + 22
        }px;">하위 페이지가 없습니다.</div>
      `
          : ''
      }
      ${
        hasChildren(document) && isShow(document.id, openDocumentsIds)
          ? `
        <ul>
          ${document.documents
            .map((doc) => SideBarTreeItem(doc, openDocumentsIds, depth + 1))
            .join('')}
        </ul>
      `
          : ''
      }
    </li>
  `
}
