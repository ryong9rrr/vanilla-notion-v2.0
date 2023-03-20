import { View } from '@/modules/core'

export default class MainPage extends View {
  template(): string {
    return `${window.location.pathname}`
  }
}
