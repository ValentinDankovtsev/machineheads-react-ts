/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import history from '../utils/history';
import { authReducer } from './auth/reducer';
import { authSaga } from './auth/sagas';

export default function configureStore() {
  const store = createStore(
    {
      initialState: {},
      enhancers: [],
      extensions: [getSagaExtension()],
    },
    {
      id: 'core',
      reducerMap: {
        router: connectRouter(history),
        auth: authReducer,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      // @ts-expect-error
      sagas: [authSaga],
      middlewares: [routerMiddleware(history)],
    }
  );

  return store;
}