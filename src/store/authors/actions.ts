import type { ValidationError } from '../auth/types';
import {
  FETCH_AUTHORS_REQUEST,
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE,
  FETCH_AUTHOR_REQUEST,
  FETCH_AUTHOR_SUCCESS,
  FETCH_AUTHOR_FAILURE,
  CREATE_AUTHOR_REQUEST,
  CREATE_AUTHOR_SUCCESS,
  CREATE_AUTHOR_FAILURE,
  UPDATE_AUTHOR_REQUEST,
  UPDATE_AUTHOR_SUCCESS,
  UPDATE_AUTHOR_FAILURE,
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  DELETE_AUTHOR_FAILURE,
  type AuthorsActionTypes,
  type FetchAuthorsPayload,
  type FetchAuthorsSuccessPayload,
  type CreateAuthorPayload,
  type UpdateAuthorPayload,
  type DeleteAuthorPayload,
  type Author,
} from './types';

export const fetchAuthorsRequest = (payload: FetchAuthorsPayload = { page: 1, perPage: 10 }): AuthorsActionTypes => ({
  type: FETCH_AUTHORS_REQUEST,
  payload,
});

export const fetchAuthorsSuccess = (payload: FetchAuthorsSuccessPayload): AuthorsActionTypes => ({
  type: FETCH_AUTHORS_SUCCESS,
  payload
});

export const fetchAuthorsFailure = (error: string): AuthorsActionTypes => ({
  type: FETCH_AUTHORS_FAILURE,
  payload: error,
});

export const fetchAuthorRequest = (id: number): AuthorsActionTypes => ({
  type: FETCH_AUTHOR_REQUEST,
  payload: id,
});

export const fetchAuthorSuccess = (author: Author): AuthorsActionTypes => ({
  type: FETCH_AUTHOR_SUCCESS,
  payload: author,
});

export const fetchAuthorFailure = (error: string): AuthorsActionTypes => ({
  type: FETCH_AUTHOR_FAILURE,
  payload: error,
});

export const createAuthorRequest = (payload: CreateAuthorPayload): AuthorsActionTypes => ({
  type: CREATE_AUTHOR_REQUEST,
  payload,
});

export const createAuthorSuccess = (author: Author): AuthorsActionTypes => ({
  type: CREATE_AUTHOR_SUCCESS,
  payload: author,
});

export const createAuthorFailure = (error: string, validationErrors: ValidationError[] = []): AuthorsActionTypes => ({
  type: CREATE_AUTHOR_FAILURE,
  payload: { error, validationErrors },
});

export const updateAuthorRequest = (payload: UpdateAuthorPayload): AuthorsActionTypes => ({
  type: UPDATE_AUTHOR_REQUEST,
  payload,
});

export const updateAuthorSuccess = (author: Author): AuthorsActionTypes => ({
  type: UPDATE_AUTHOR_SUCCESS,
  payload: author,
});

export const updateAuthorFailure = (error: string, validationErrors: ValidationError[] = []): AuthorsActionTypes => ({
  type: UPDATE_AUTHOR_FAILURE,
  payload: { error, validationErrors },
});

export const deleteAuthorRequest = (payload: DeleteAuthorPayload): AuthorsActionTypes => ({
  type: DELETE_AUTHOR_REQUEST,
  payload,
});

export const deleteAuthorSuccess = (id: number): AuthorsActionTypes => ({
  type: DELETE_AUTHOR_SUCCESS,
  payload: id,
});

export const deleteAuthorFailure = (error: string): AuthorsActionTypes => ({
  type: DELETE_AUTHOR_FAILURE,
  payload: error,
});