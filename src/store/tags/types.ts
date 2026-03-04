import type { Pagination, FetchListPayload } from '../commonTypes';
import type { ValidationError } from '../auth/types';

export interface Tag {
  id: number;
  name: string;
  code: string;
  sort: number;
  createdAt: string;
  updatedAt: string;
}

export interface TagInput {
  name: string;
  code?: string;
  sort?: number;
}

export interface TagsState {
  tags: Tag[];
  currentTag: Tag | null;
  loading: boolean;
  tagLoading: boolean;
  error: string | null;
  validationErrors: ValidationError[] | null;
  pagination: Pagination;
}

export const FETCH_TAGS_REQUEST = 'tags/FETCH_TAGS_REQUEST';
export const FETCH_TAGS_SUCCESS = 'tags/FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'tags/FETCH_TAGS_FAILURE';

export const FETCH_TAG_REQUEST = 'tags/FETCH_TAG_REQUEST';
export const FETCH_TAG_SUCCESS = 'tags/FETCH_TAG_SUCCESS';
export const FETCH_TAG_FAILURE = 'tags/FETCH_TAG_FAILURE';

export const CREATE_TAG_REQUEST = 'tags/CREATE_TAG_REQUEST';
export const CREATE_TAG_SUCCESS = 'tags/CREATE_TAG_SUCCESS';
export const CREATE_TAG_FAILURE = 'tags/CREATE_TAG_FAILURE';

export const UPDATE_TAG_REQUEST = 'tags/UPDATE_TAG_REQUEST';
export const UPDATE_TAG_SUCCESS = 'tags/UPDATE_TAG_SUCCESS';
export const UPDATE_TAG_FAILURE = 'tags/UPDATE_TAG_FAILURE';

export const DELETE_TAG_REQUEST = 'tags/DELETE_TAG_REQUEST';
export const DELETE_TAG_SUCCESS = 'tags/DELETE_TAG_SUCCESS';
export const DELETE_TAG_FAILURE = 'tags/DELETE_TAG_FAILURE';

export type FetchTagsPayload = Partial<FetchListPayload>;
export type CreateTagPayload = TagInput;
export interface UpdateTagPayload {
  id: number;
  data: Partial<TagInput>;
}
export interface DeleteTagPayload {
  id: number;
}

export interface FetchTagsSuccessPayload {
  tags: Tag[];
  pagination: Pagination;
}

export interface FetchTagsRequestAction {
  type: typeof FETCH_TAGS_REQUEST;
  payload: FetchTagsPayload;
}

export interface FetchTagsSuccessAction {
  type: typeof FETCH_TAGS_SUCCESS;
  payload: FetchTagsSuccessPayload;
}

export interface FetchTagsFailureAction {
  type: typeof FETCH_TAGS_FAILURE;
  payload: string;
}

export interface FetchTagRequestAction {
  type: typeof FETCH_TAG_REQUEST;
  payload: number;
}

export interface FetchTagSuccessAction {
  type: typeof FETCH_TAG_SUCCESS;
  payload: Tag;
}

export interface FetchTagFailureAction {
  type: typeof FETCH_TAG_FAILURE;
  payload: string;
}

export interface CreateTagRequestAction {
  type: typeof CREATE_TAG_REQUEST;
  payload: CreateTagPayload;
}

export interface CreateTagSuccessAction {
  type: typeof CREATE_TAG_SUCCESS;
  payload: Tag;
}

export interface CreateTagFailureAction {
  type: typeof CREATE_TAG_FAILURE;
  payload: {
    error: string;
    validationErrors: ValidationError[];
  };
}

export interface UpdateTagRequestAction {
  type: typeof UPDATE_TAG_REQUEST;
  payload: UpdateTagPayload;
}

export interface UpdateTagSuccessAction {
  type: typeof UPDATE_TAG_SUCCESS;
  payload: Tag;
}

export interface UpdateTagFailureAction {
  type: typeof UPDATE_TAG_FAILURE;
  payload: {
    error: string;
    validationErrors: ValidationError[];
  };
}

export interface DeleteTagRequestAction {
  type: typeof DELETE_TAG_REQUEST;
  payload: DeleteTagPayload;
}

export interface DeleteTagSuccessAction {
  type: typeof DELETE_TAG_SUCCESS;
  payload: number;
}

export interface DeleteTagFailureAction {
  type: typeof DELETE_TAG_FAILURE;
  payload: string;
}

export type TagsActionTypes = 
  | FetchTagsRequestAction
  | FetchTagsSuccessAction
  | FetchTagsFailureAction
  | FetchTagRequestAction
  | FetchTagSuccessAction
  | FetchTagFailureAction
  | CreateTagRequestAction
  | CreateTagSuccessAction
  | CreateTagFailureAction
  | UpdateTagRequestAction
  | UpdateTagSuccessAction
  | UpdateTagFailureAction
  | DeleteTagRequestAction
  | DeleteTagSuccessAction
  | DeleteTagFailureAction;