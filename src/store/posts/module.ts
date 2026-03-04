import type { ISagaModule } from 'redux-dynamic-modules-saga';
import { postsReducer } from './reducer';
import {postsSaga} from './sagas';
import type { PostsState } from './types';

export function getPostsModule(): ISagaModule<PostsState> {
  return {
    id: 'posts',
    reducerMap: {
      posts: postsReducer,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    sagas: [postsSaga],
  };
}