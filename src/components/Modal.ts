import './Modal.scss'
import { Component } from '@/@modules/core'

interface Props extends Record<string, any> {
  isVisibleModal: boolean
  onCloseModal: () => void
  onCreateNewDocument: () => void
}

export default class Modal extends Component<Props> {
  template(): string {
    if (!this.props.isVisibleModal) {
      return ``
    }

    return `
      <div class="modal-overlay">
        <div class="modal-wrapper">
          <div class="modal-contents">
            <input class="title" name="title" placeholder="제목을 입력하세요" />
          </div>
        </div>
      </div>
    `
  }

  handleClickModalWrapper(title: string) {
    this.props.onCloseModal()
    if (title) {
      this.props.onCreateNewDocument()
    }
  }

  setEvent(): void {
    this.addEvent('click', '.modal-wrapper', (e) => {
      const $target = e.target as HTMLElement
      if ($target && !$target.classList.contains('modal-wrapper')) {
        return
      }
      const $input = $target.querySelector('input') as HTMLInputElement
      const title = $input.value
      this.handleClickModalWrapper(title)
    })
  }
}
