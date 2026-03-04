import { call, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';
import { push } from 'connected-react-router';
import client from '../../api/client';
import {
  fetchPostsSuccess,
  fetchPostsFailure,
  fetchPostSuccess,
  fetchPostFailure,
  createPostSuccess,
  createPostFailure,
  updatePostSuccess,
  updatePostFailure,
  deletePostSuccess,
  deletePostFailure,
  fetchPostsRequest,
} from './actions';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POST_REQUEST,
  CREATE_POST_REQUEST,
  UPDATE_POST_REQUEST,
  DELETE_POST_REQUEST,
  type FetchPostsPayload,
  type Post,
  type FetchPostRequestAction,
  type CreatePostRequestAction,
  type UpdatePostRequestAction,
  type DeletePostRequestAction,
  type CreatePostPayload,
  type PostInput,
} from './types';
import { handleApiError } from '../../utils/apiErrorHandler';
import { extractPaginationFromHeaders } from '../../utils/paginationUtils';
import history from '../../utils/history';

const fetchPostsApi = (params: FetchPostsPayload) => {
  return client.get<Post[]>('/manage/posts', { params });
};

const fetchPostApi = (id: number) => {
  return client.get<Post>(`/manage/posts/detail?id=${id}`);
};

const createFormData = (data: Partial<PostInput>) => {
  const formData = new FormData();
  if (data.title) formData.append('title', data.title);
  if (data.code) formData.append('code', data.code);
  if (data.authorId) formData.append('authorId', String(data.authorId));
  if (data.text) formData.append('text', data.text);
  
  if (data.tagIds && data.tagIds.length > 0) {
    data.tagIds.forEach((id) => {
      formData.append('tagIds[]', String(id));
    });
  }

  if (data.previewPicture) {
    formData.append('previewPicture', data.previewPicture);
  }
  
  return formData;
};

const createPostApi = (data: CreatePostPayload) => {
  const formData = createFormData(data);
  return client.post<Post>('/manage/posts/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const updatePostApi = (id: number, data: Partial<PostInput>) => {
  const formData = createFormData(data);
  return client.post<Post>(`/manage/posts/edit?id=${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deletePostApi = (id: number) => {
  return client.delete(`/manage/posts/remove?id=${id}`);
};

function* fetchPostsSaga(action: { type: typeof FETCH_POSTS_REQUEST, payload: FetchPostsPayload }) {
  try {
    const response: AxiosResponse<Post[]> = yield call(fetchPostsApi, action.payload);
    const pagination = extractPaginationFromHeaders(response.headers);
    yield put(fetchPostsSuccess({ posts: response.data, pagination }));
  } catch (error) {
    const { message } = handleApiError(error, 'Ошибка загрузки постов');
    yield put(fetchPostsFailure(message));
  }
}

function* fetchPostSaga(action: FetchPostRequestAction) {
  try {
    const response: AxiosResponse<Post> = yield call(fetchPostApi, action.payload);
    const post = response.data;

    if (post) {
      yield put(fetchPostSuccess(post));
    } else {
      yield put(fetchPostFailure('Пост не найден'));
    }
  } catch (error) {
    const { message } = handleApiError(error, 'Ошибка получения данных поста');
    yield put(fetchPostFailure(message));
  }
}

function* createPostSaga(action: CreatePostRequestAction) {
  try {
    const response: AxiosResponse<Post> = yield call(createPostApi, action.payload);
    yield put(createPostSuccess(response.data));
    yield put(push('/posts'));
    yield put(fetchPostsRequest({ page: 1, perPage: 10 }));
  } catch (error) {
    const { message, validationErrors } = handleApiError(error, 'Ошибка создания поста');
    yield put(createPostFailure(message, validationErrors));
  }
}

function* updatePostSaga(action: UpdatePostRequestAction) {
  try {
    const response: AxiosResponse<Post> = yield call(updatePostApi, action.payload.id, action.payload.data);
    yield put(updatePostSuccess(response.data));
    yield call([history, history.push], '/posts');
    yield put(fetchPostsRequest({ page: 1, perPage: 10 }));
  } catch (error) {
    const { message, validationErrors } = handleApiError(error, 'Ошибка обновления поста');
    yield put(updatePostFailure(message, validationErrors));
  }
}

function* deletePostSaga(action: DeletePostRequestAction) {
  try {
    yield call(deletePostApi, action.payload.id);
    yield put(deletePostSuccess(action.payload.id));
    yield put(fetchPostsRequest({ page: 1, perPage: 10 }));
  } catch (error) {
    const { message } = handleApiError(error, 'Ошибка удаления поста');
    yield put(deletePostFailure(message));
  }
}

export function* postsSaga() {
  yield takeLatest(FETCH_POSTS_REQUEST, fetchPostsSaga);
  yield takeLatest(FETCH_POST_REQUEST, fetchPostSaga);
  yield takeLatest(CREATE_POST_REQUEST, createPostSaga);
  yield takeLatest(UPDATE_POST_REQUEST, updatePostSaga);
  yield takeLatest(DELETE_POST_REQUEST, deletePostSaga);
}