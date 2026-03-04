import type { ISagaModule } from 'redux-dynamic-modules-saga';
import { authorsReducer } from './reducer';
import {authorsSaga} from './sagas';
import type { AuthorsState } from './types';

export function getAuthorsModule(): ISagaModule<AuthorsState> {
  return {
    id: 'authors',
    reducerMap: {
      authors: authorsReducer,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    sagas: [authorsSaga],
  };
}