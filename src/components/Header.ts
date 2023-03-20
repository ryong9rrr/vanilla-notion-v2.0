import './Header.scss'
import { Component } from '@/lib/core'

export default class Header extends Component {
  template(): string {
    return `
      <header>
        <div class="titles">
          <div>header</div>
        </div>
        <div class="actions">
          <button>공유</button>
          <button>업데이트</button>
          <button>즐겨찾기</button>
          <button>기타</button>
        </div>
      </header>
    `
  }
}
