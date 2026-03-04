import { all } from 'redux-saga/effects';
import { authSaga } from './auth/sagas';
import { postsSaga } from './posts/sagas';
import { tagsSaga } from './tags/sagas';
import { authorsSaga } from './authors/sagas';

export default function* rootSaga() {
  yield all([
    authSaga(),
    postsSaga(),
    tagsSaga(),
    authorsSaga(),
  ]);
}