import './NotFoundPage.scss'
import { View } from '@/modules/core'

export default class NotFoundPage extends View {
  template(): string {
    return `
      <section id="NotFoundPage">
        <h1>404 Page Not Found</h1>
      </section>
    `
  }
}
