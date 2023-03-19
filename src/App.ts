import { createRouter } from './lib/router'
import NotFoundPage from './pages/NotFoundPage'

export default function App(rootId: string) {
  const router = createRouter(rootId)

  router.setNotFoundView(NotFoundPage)

  router.route()
}
