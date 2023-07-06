import './SideBarTreeItem.scss'
import { IDocument } from '@/models/document'
import { extractParamsFromURL } from '@/utils'

const isActive = (documentId: number) => {
  const currentDocumentId = Number(extractParamsFromURL('/document/'))
  return currentDocumentId && currentDocumentId === documentId
}

const hasChildren = (document: IDocument) => {
  return document.documents && document.documents.length > 0
}

const isShow = (documentId: number, openDocumentsIds: Set<number>) => {
  return openDocumentsIds.has(documentId)
}

interface Props {
  document: IDocument
  openDocumentsIds: Set<number>
}

export default function SideBarTreeItem(props: Props, depth: number = 1): string {
  const { document, openDocumentsIds } = props

  return `
    <li data-id="${document.id}">
      <div class="title ${isActive(document.id) ? 'active' : ''}" style="padding-left: ${
    14 * depth
  }px;">
        <span class="material-icons toggle-btn ${
          isShow(document.id, openDocumentsIds) ? 'active' : ''
        }">play_arrow</span>
        <span class="text">${document.title || '제목 없음'}</span>
        <div class="actions">
          <span class="material-icons add-btn">add</span>
          <span class="material-icons delete-btn">delete</span>
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
            .map((doc) => SideBarTreeItem({ ...props, document: doc, openDocumentsIds }, depth + 1))
            .join('')}
        </ul>
      `
          : ''
      }
    </li>
  `
}
