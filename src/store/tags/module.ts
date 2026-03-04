import type { ISagaModule } from 'redux-dynamic-modules-saga';
import { tagsReducer } from './reducer';
import {tagsSaga} from './sagas';
import type { TagsState } from './types';

export function getTagsModule(): ISagaModule<TagsState> {
  return {
    id: 'tags',
    reducerMap: {
      tags: tagsReducer,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
    sagas: [tagsSaga],
  };
}