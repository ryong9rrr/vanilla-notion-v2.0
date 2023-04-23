import { flux } from 'sangyoon-ui'

import documentReducer from './reducer'

export const documentStore = flux.createStore(documentReducer)
