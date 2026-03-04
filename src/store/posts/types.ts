import type { FetchListPayload, Pagination } from "../commonTypes";
import type { ValidationError } from "../auth/types";
import type { Tag } from "../tags/types";
import type { Author } from "../authors/types";

export interface Post {
  id: number;
  title: string;
  code: string;
  authorName?: string;
  author?: Author;
  authorId?: number;
  previewPicture?: {
    id: number;
    name: string;
    url: string;
  };
  text?: string;
  tagNames: string[];
  tagIds?: number[];
  tags: Tag[];
  updatedAt: string;
  createdAt: string;
}

export interface PostInput {
  title: string;
  code?: string;
  authorId: number;
  tagIds: number[];
  text: string;
  previewPicture?: File;
}

export interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  postLoading: boolean;
  error: string | null;
  validationErrors: ValidationError[] | null;
  pagination: Pagination;
}

export type FetchPostsPayload = Partial<FetchListPayload>;

export const FETCH_POSTS_REQUEST = 'posts/FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'posts/FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'posts/FETCH_POSTS_FAILURE';

export const FETCH_POST_REQUEST = 'posts/FETCH_POST_REQUEST';
export const FETCH_POST_SUCCESS = 'posts/FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'posts/FETCH_POST_FAILURE';

export const CREATE_POST_REQUEST = 'posts/CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'posts/CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'posts/CREATE_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'posts/UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'posts/UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'posts/UPDATE_POST_FAILURE';

export const DELETE_POST_REQUEST = 'posts/DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'posts/DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'posts/DELETE_POST_FAILURE';

export const CLEAR_POST_DETAILS = 'posts/CLEAR_POST_DETAILS';

export interface FetchPostsRequestAction {
  type: typeof FETCH_POSTS_REQUEST;
  payload: FetchPostsPayload;
}

export interface FetchPostsSuccessPayload {
  posts: Post[];
  pagination: Pagination;
}

export interface FetchPostsSuccessAction {
  type: typeof FETCH_POSTS_SUCCESS;
  payload: FetchPostsSuccessPayload;
}

export interface FetchPostsFailureAction {
  type: typeof FETCH_POSTS_FAILURE;
  payload: string;
}

export interface FetchPostRequestAction {
  type: typeof FETCH_POST_REQUEST;
  payload: number;
}

export interface FetchPostSuccessAction {
  type: typeof FETCH_POST_SUCCESS;
  payload: Post;
}

export interface FetchPostFailureAction {
  type: typeof FETCH_POST_FAILURE;
  payload: string;
}

export type CreatePostPayload = PostInput;

export interface CreatePostRequestAction {
  type: typeof CREATE_POST_REQUEST;
  payload: CreatePostPayload;
}

export interface CreatePostSuccessAction {
  type: typeof CREATE_POST_SUCCESS;
  payload: Post;
}

export interface CreatePostFailureAction {
  type: typeof CREATE_POST_FAILURE;
  payload: {
    error: string;
    validationErrors: ValidationError[];
  };
}

export interface UpdatePostPayload {
  id: number;
  data: Partial<PostInput>;
}

export interface UpdatePostRequestAction {
  type: typeof UPDATE_POST_REQUEST;
  payload: UpdatePostPayload;
}

export interface UpdatePostSuccessAction {
  type: typeof UPDATE_POST_SUCCESS;
  payload: Post;
}

export interface UpdatePostFailureAction {
  type: typeof UPDATE_POST_FAILURE;
  payload: {
    error: string;
    validationErrors: ValidationError[];
  };
}

export interface DeletePostPayload {
  id: number;
}

export interface DeletePostRequestAction {
  type: typeof DELETE_POST_REQUEST;
  payload: DeletePostPayload;
}

export interface DeletePostSuccessAction {
  type: typeof DELETE_POST_SUCCESS;
  payload: number;
}

export interface DeletePostFailureAction {
  type: typeof DELETE_POST_FAILURE;
  payload: string;
}

export interface ClearPostDetailsAction {
  type: typeof CLEAR_POST_DETAILS;
}

export type PostsActionTypes = 
  | FetchPostsRequestAction
  | FetchPostsSuccessAction
  | FetchPostsFailureAction
  | FetchPostRequestAction
  | FetchPostSuccessAction
  | FetchPostFailureAction
  | CreatePostRequestAction
  | CreatePostSuccessAction
  | CreatePostFailureAction
  | UpdatePostRequestAction
  | UpdatePostSuccessAction
  | UpdatePostFailureAction
  | DeletePostRequestAction
  | DeletePostSuccessAction
  | DeletePostFailureAction
  | ClearPostDetailsAction;