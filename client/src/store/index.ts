import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { errorReporter } from '../middleware/errorHandle';

export function configureStore (preloadState: any = {}) {
  const store = createStore(
    reducers,
    preloadState,
    composeWithDevTools(
      applyMiddleware(thunk, logger, errorReporter)
     // (window as any).devToolsExtension && (window as any).devToolsExtension()
    )
  )

  return store;
}
