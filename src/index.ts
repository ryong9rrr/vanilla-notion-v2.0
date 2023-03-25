import App, { MAIN_PAGE_ROOT_CLASS_SELECTOR } from './App'
import { createRouter } from './@modules/router'
import { HomePage, MainPage, NotFoundPage } from './pages'
import { ROUTE_PATH } from './routePath'

const router = createRouter(`.${MAIN_PAGE_ROOT_CLASS_SELECTOR}`)
router.addRoute(ROUTE_PATH.HOME, HomePage)
router.addRoute(`${ROUTE_PATH.DOCUMENT_PAGE}/:documentId`, MainPage)
router.setNotFoundView(NotFoundPage)

new App('#root')

router.route()
