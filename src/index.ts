import App, { MAIN_PAGE_ROOT_CLASS_SELECTOR } from './App'
import { createRouter } from './@modules/router'
import { HomePage, MainPage, NotFoundPage } from './pages'

new App('#root', {})

const router = createRouter(`.${MAIN_PAGE_ROOT_CLASS_SELECTOR}`)

router.addRoute('/', HomePage)
router.addRoute(/^\/document\/[\w]+\/?$/, MainPage)
router.setNotFoundView(NotFoundPage)

router.route()
