import './NotFoundPage.scss'
import { View } from '@/lib/core'

export default class NotFoundPage extends View {
  template(): string {
    return `
      <section id="NotFoundPage">
        <h1>404 Page Not Found</h1>
      </section>
    `
  }
}
