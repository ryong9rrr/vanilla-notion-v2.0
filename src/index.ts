import { router } from 'sangyoon-ui'

import App, { MAIN_PAGE_ROOT_CLASS_SELECTOR } from './App'
import { HomePage, MainPage, NotFoundPage } from './pages'
import { ROUTE_PATH } from './routePath'

const appRouter = router.createRouter(`.${MAIN_PAGE_ROOT_CLASS_SELECTOR}`)

appRouter.addRoute(ROUTE_PATH.HOME, HomePage)
appRouter.addRoute(`${ROUTE_PATH.DOCUMENT_PAGE}/:documentId`, MainPage)
appRouter.setNotFoundView(NotFoundPage)

new App('#root')

appRouter.route()
