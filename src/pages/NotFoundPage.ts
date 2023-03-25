import './NotFoundPage.scss'
import { Component } from '@/@modules/core'

export default class NotFoundPage extends Component {
  template(): string {
    return `
      <section id="NotFoundPage">
        <h1>404 Page Not Found</h1>
      </section>
    `
  }
}
