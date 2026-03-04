import type { ValidationError } from '../auth/types';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CLEAR_POST_DETAILS,
  type FetchPostsPayload,
  type FetchPostsSuccessPayload,
  type CreatePostPayload,
  type UpdatePostPayload,
  type DeletePostPayload,
  type Post,
  type PostsActionTypes,
} from './types';

export const fetchPostsRequest = (payload: FetchPostsPayload = { page: 1, perPage: 10 }): PostsActionTypes => ({
  type: FETCH_POSTS_REQUEST,
  payload,
});

export const fetchPostsSuccess = (payload: FetchPostsSuccessPayload): PostsActionTypes => ({
  type: FETCH_POSTS_SUCCESS,
  payload,
});

export const fetchPostsFailure = (error: string): PostsActionTypes => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const fetchPostRequest = (id: number): PostsActionTypes => ({
  type: FETCH_POST_REQUEST,
  payload: id,
});

export const fetchPostSuccess = (post: Post): PostsActionTypes => ({
  type: FETCH_POST_SUCCESS,
  payload: post,
});

export const fetchPostFailure = (error: string): PostsActionTypes => ({
  type: FETCH_POST_FAILURE,
  payload: error,
});

export const createPostRequest = (payload: CreatePostPayload): PostsActionTypes => ({
  type: CREATE_POST_REQUEST,
  payload,
});

export const createPostSuccess = (post: Post): PostsActionTypes => ({
  type: CREATE_POST_SUCCESS,
  payload: post,
});

export const createPostFailure = (error: string, validationErrors: ValidationError[] = []): PostsActionTypes => ({
  type: CREATE_POST_FAILURE,
  payload: { error, validationErrors },
});

export const updatePostRequest = (payload: UpdatePostPayload): PostsActionTypes => ({
  type: UPDATE_POST_REQUEST,
  payload,
});

export const updatePostSuccess = (post: Post): PostsActionTypes => ({
  type: UPDATE_POST_SUCCESS,
  payload: post,
});

export const updatePostFailure = (error: string, validationErrors: ValidationError[] = []): PostsActionTypes => ({
  type: UPDATE_POST_FAILURE,
  payload: { error, validationErrors },
});

export const deletePostRequest = (payload: DeletePostPayload): PostsActionTypes => ({
  type: DELETE_POST_REQUEST,
  payload,
});

export const deletePostSuccess = (id: number): PostsActionTypes => ({
  type: DELETE_POST_SUCCESS,
  payload: id,
});

export const deletePostFailure = (error: string): PostsActionTypes => ({
  type: DELETE_POST_FAILURE,
  payload: error,
});

export const clearPostDetails = (): PostsActionTypes => ({
  type: CLEAR_POST_DETAILS,
});