import type { ValidationError } from '../auth/types';
import {
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  FETCH_TAG_REQUEST,
  FETCH_TAG_SUCCESS,
  FETCH_TAG_FAILURE,
  CREATE_TAG_REQUEST,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_FAILURE,
  UPDATE_TAG_REQUEST,
  UPDATE_TAG_SUCCESS,
  UPDATE_TAG_FAILURE,
  DELETE_TAG_REQUEST,
  DELETE_TAG_SUCCESS,
  DELETE_TAG_FAILURE,
  type TagsActionTypes,
  type FetchTagsPayload,
  type FetchTagsSuccessPayload,
  type CreateTagPayload,
  type UpdateTagPayload,
  type DeleteTagPayload,
  type Tag,
} from './types';

export const fetchTagsRequest = (payload: FetchTagsPayload = { page: 1, perPage: 10 }): TagsActionTypes => ({
  type: FETCH_TAGS_REQUEST,
  payload,
});

export const fetchTagsSuccess = (payload: FetchTagsSuccessPayload): TagsActionTypes => ({
  type: FETCH_TAGS_SUCCESS,
  payload
});

export const fetchTagsFailure = (error: string): TagsActionTypes => ({
  type: FETCH_TAGS_FAILURE,
  payload: error,
});

export const fetchTagRequest = (id: number): TagsActionTypes => ({
  type: FETCH_TAG_REQUEST,
  payload: id,
});

export const fetchTagSuccess = (tag: Tag): TagsActionTypes => ({
  type: FETCH_TAG_SUCCESS,
  payload: tag,
});

export const fetchTagFailure = (error: string): TagsActionTypes => ({
  type: FETCH_TAG_FAILURE,
  payload: error,
});

export const createTagRequest = (payload: CreateTagPayload): TagsActionTypes => ({
  type: CREATE_TAG_REQUEST,
  payload,
});

export const createTagSuccess = (tag: Tag): TagsActionTypes => ({
  type: CREATE_TAG_SUCCESS,
  payload: tag,
});

export const createTagFailure = (error: string, validationErrors: ValidationError[] = []): TagsActionTypes => ({
  type: CREATE_TAG_FAILURE,
  payload: { error, validationErrors },
});

export const updateTagRequest = (payload: UpdateTagPayload): TagsActionTypes => ({
  type: UPDATE_TAG_REQUEST,
  payload,
});

export const updateTagSuccess = (tag: Tag): TagsActionTypes => ({
  type: UPDATE_TAG_SUCCESS,
  payload: tag,
});

export const updateTagFailure = (error: string, validationErrors: ValidationError[] = []): TagsActionTypes => ({
  type: UPDATE_TAG_FAILURE,
  payload: { error, validationErrors },
});

export const deleteTagRequest = (payload: DeleteTagPayload): TagsActionTypes => ({
  type: DELETE_TAG_REQUEST,
  payload,
});

export const deleteTagSuccess = (id: number): TagsActionTypes => ({
  type: DELETE_TAG_SUCCESS,
  payload: id,
});

export const deleteTagFailure = (error: string): TagsActionTypes => ({
  type: DELETE_TAG_FAILURE,
  payload: error,
});