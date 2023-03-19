import './App.scss'
import { View } from './lib/core'
import { createRouter } from './lib/router'
import { MainPage, NotFoundPage } from './pages'
import { Header, SideBar } from './components'

export default class App extends View {
  template(): string {
    return `
      <div class="app__inner">
        <div id="SideBarComponent"></div>
        <div class="app__page">
          <div class="page__header">
            <div id="HeaderComponent"></div>
          </div>
          <div class="page__container">
            <div id="MainPageView"></div>
          </div>
        </div>
      </div>
    `
  }

  setChildren(): void {
    this.addComponent(SideBar, '#SideBarComponent', {})
    this.addComponent(Header, '#HeaderComponent', {})
  }

  run() {
    const router = createRouter('.page__container')

    router.addRoute('/', MainPage)
    router.addRoute(/^\/workspaces\/[\w]+\/?$/, MainPage)
    router.setNotFoundView(NotFoundPage)

    router.route()
  }
}
