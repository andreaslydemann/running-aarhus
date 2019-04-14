import { Store, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { RootState } from "reducers/states";
import reducers from "reducers";
import sagas from "sagas";

export function configureStore(initialState?: RootState): Store<RootState> {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));

  const store = createStore(
    reducers as any,
    initialState as any,
    middleware
  ) as Store<RootState>;

  sagaMiddleware.run(sagas);

  return store;
}
