import { ui } from 'sangyoon-ui'

import './NotFoundPage.scss'

export default class NotFoundPage extends ui.Component {
  template(): string {
    return `
      <section id="NotFoundPage">
        <h1>404 Page Not Found</h1>
      </section>
    `
  }
}
