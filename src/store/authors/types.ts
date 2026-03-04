import type { FetchListPayload, Pagination } from "../commonTypes";
import type { ValidationError } from "../auth/types";

export interface Author {
  id: number;
  name: string;
  lastName: string;
  secondName?: string;
  shortDescription?: string;
  description?: string;
  avatar?: {
    id: number;
    name: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AuthorInput {
  name: string;
  lastName: string;
  secondName?: string;
  shortDescription?: string;
  description?: string;
  avatar?: File;
  removeAvatar?: boolean;
}

export interface AuthorsState {
  authors: Author[];
  currentAuthor: Author | null;
  loading: boolean;
  authorLoading: boolean;
  error: string | null;
  validationErrors: ValidationError[] | null;
  pagination: Pagination;
}


export type FetchAuthorsPayload = Partial<FetchListPayload>;

export const FETCH_AUTHORS_REQUEST = 'authors/FETCH_AUTHORS_REQUEST';
export const FETCH_AUTHORS_SUCCESS = 'authors/FETCH_AUTHORS_SUCCESS';
export const FETCH_AUTHORS_FAILURE = 'authors/FETCH_AUTHORS_FAILURE';

export const FETCH_AUTHOR_REQUEST = 'authors/FETCH_AUTHOR_REQUEST';
export const FETCH_AUTHOR_SUCCESS = 'authors/FETCH_AUTHOR_SUCCESS';
export const FETCH_AUTHOR_FAILURE = 'authors/FETCH_AUTHOR_FAILURE';

export const CREATE_AUTHOR_REQUEST = 'authors/CREATE_AUTHOR_REQUEST';
export const CREATE_AUTHOR_SUCCESS = 'authors/CREATE_AUTHOR_SUCCESS';
export const CREATE_AUTHOR_FAILURE = 'authors/CREATE_AUTHOR_FAILURE';

export const UPDATE_AUTHOR_REQUEST = 'authors/UPDATE_AUTHOR_REQUEST';
export const UPDATE_AUTHOR_SUCCESS = 'authors/UPDATE_AUTHOR_SUCCESS';
export const UPDATE_AUTHOR_FAILURE = 'authors/UPDATE_AUTHOR_FAILURE';

export const DELETE_AUTHOR_REQUEST = 'authors/DELETE_AUTHOR_REQUEST';
export const DELETE_AUTHOR_SUCCESS = 'authors/DELETE_AUTHOR_SUCCESS';
export const DELETE_AUTHOR_FAILURE = 'authors/DELETE_AUTHOR_FAILURE';

export type CreateAuthorPayload = AuthorInput;

export interface UpdateAuthorPayload {
  id: number;
  data: Partial<AuthorInput>;
}

export interface DeleteAuthorPayload {
  id: number;
}

export interface FetchAuthorsSuccessPayload {
  authors: Author[];
  pagination: Pagination;
}

export interface FetchAuthorsRequestAction {
  type: typeof FETCH_AUTHORS_REQUEST;
  payload: FetchAuthorsPayload;
}

export interface FetchAuthorsSuccessAction {
  type: typeof FETCH_AUTHORS_SUCCESS;
  payload: FetchAuthorsSuccessPayload;
}

export interface FetchAuthorsFailureAction {
  type: typeof FETCH_AUTHORS_FAILURE;
  payload: string;
}

export interface FetchAuthorRequestAction {
  type: typeof FETCH_AUTHOR_REQUEST;
  payload: number; // id
}

export interface FetchAuthorSuccessAction {
  type: typeof FETCH_AUTHOR_SUCCESS;
  payload: Author;
}

export interface FetchAuthorFailureAction {
  type: typeof FETCH_AUTHOR_FAILURE;
  payload: string;
}

export interface CreateAuthorRequestAction {
  type: typeof CREATE_AUTHOR_REQUEST;
  payload: CreateAuthorPayload;
}

export interface CreateAuthorSuccessAction {
  type: typeof CREATE_AUTHOR_SUCCESS;
  payload: Author;
}

export interface CreateAuthorFailureAction {
  type: typeof CREATE_AUTHOR_FAILURE;
  payload: {
    error: string;
    validationErrors: ValidationError[];
  };
}

export interface UpdateAuthorRequestAction {
  type: typeof UPDATE_AUTHOR_REQUEST;
  payload: UpdateAuthorPayload;
}

export interface UpdateAuthorSuccessAction {
  type: typeof UPDATE_AUTHOR_SUCCESS;
  payload: Author;
}

export interface UpdateAuthorFailureAction {
  type: typeof UPDATE_AUTHOR_FAILURE;
  payload: {
    error: string;
    validationErrors: ValidationError[];
  };
}

export interface DeleteAuthorRequestAction {
  type: typeof DELETE_AUTHOR_REQUEST;
  payload: DeleteAuthorPayload;
}

export interface DeleteAuthorSuccessAction {
  type: typeof DELETE_AUTHOR_SUCCESS;
  payload: number; // id of deleted author
}

export interface DeleteAuthorFailureAction {
  type: typeof DELETE_AUTHOR_FAILURE;
  payload: string;
}

export type AuthorsActionTypes = 
  | FetchAuthorsRequestAction
  | FetchAuthorsSuccessAction
  | FetchAuthorsFailureAction
  | FetchAuthorRequestAction
  | FetchAuthorSuccessAction
  | FetchAuthorFailureAction
  | CreateAuthorRequestAction
  | CreateAuthorSuccessAction
  | CreateAuthorFailureAction
  | UpdateAuthorRequestAction
  | UpdateAuthorSuccessAction
  | UpdateAuthorFailureAction
  | DeleteAuthorRequestAction
  | DeleteAuthorSuccessAction
  | DeleteAuthorFailureAction;