import { createStore } from '@/@modules/flux'
import documentReducer from './reducer'

export const documentStore = createStore(documentReducer)
