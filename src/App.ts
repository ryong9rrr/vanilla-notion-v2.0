import './App.scss'
import { Component } from './@modules/core'
import { Header, SideBar } from './components'

export const SIDEBAR_COMPONENT_ID_SELECTOR = 'SideBarComponent'
const HEADER_COMPONENT_ID_SELECTOR = 'HeaderComponent'
export const MAIN_PAGE_ROOT_CLASS_SELECTOR = 'page__container'

export default class App extends Component {
  template(): string {
    return `
      <div class="app__inner">
        <div id="${SIDEBAR_COMPONENT_ID_SELECTOR}" style="width: 240px;"></div>
        <div class="app__page">
          <div class="page__header">
            <div id="${HEADER_COMPONENT_ID_SELECTOR}"></div>
          </div>
          <div class="${MAIN_PAGE_ROOT_CLASS_SELECTOR}">
            <div id="MainPageView"></div>
          </div>
        </div>
      </div>
    `
  }

  setChildren(): void {
    this.addComponent(SideBar, `#${SIDEBAR_COMPONENT_ID_SELECTOR}`)
    this.addComponent(Header, `#${HEADER_COMPONENT_ID_SELECTOR}`)
  }
}
