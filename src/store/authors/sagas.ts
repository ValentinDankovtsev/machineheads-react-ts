import { call, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';
import client from '../../api/client';
import {
  fetchAuthorsRequest,
  fetchAuthorsSuccess,
  fetchAuthorsFailure,
  fetchAuthorSuccess,
  fetchAuthorFailure,
  createAuthorSuccess,
  createAuthorFailure,
  updateAuthorSuccess,
  updateAuthorFailure,
  deleteAuthorSuccess,
  deleteAuthorFailure,
} from './actions';
import {
  FETCH_AUTHORS_REQUEST,
  FETCH_AUTHOR_REQUEST,
  CREATE_AUTHOR_REQUEST,
  UPDATE_AUTHOR_REQUEST,
  DELETE_AUTHOR_REQUEST,
  type Author,
  type FetchAuthorsRequestAction,
  type FetchAuthorRequestAction,
  type CreateAuthorRequestAction,
  type UpdateAuthorRequestAction,
  type DeleteAuthorRequestAction,
  type CreateAuthorPayload,
  type UpdateAuthorPayload,
  type DeleteAuthorPayload,
  type FetchAuthorsPayload,
  type AuthorInput,
} from './types';
import { handleApiError } from '../../utils/apiErrorHandler';
import { extractPaginationFromHeaders } from '../../utils/paginationUtils';
import history from '../../utils/history';
import { push } from 'connected-react-router';

const fetchAuthorsApi = (params: FetchAuthorsPayload) => {
  return client.get<Author[]>('/manage/authors', { params});
};

const fetchAuthorApi = (id: number) => {
  return client.get<Author | Author[]>(`/manage/authors/detail?id=${id}`);
};

const createFormData = (data: Partial<AuthorInput>) => {
  const formData = new FormData();
  if (data.name) formData.append('name', data.name);
  if (data.lastName) formData.append('lastName', data.lastName);
  if (data.secondName) formData.append('secondName', data.secondName);
  if (data.shortDescription) formData.append('shortDescription', data.shortDescription);
  if (data.description) formData.append('description', data.description);
  if (data.avatar) formData.append('avatar', data.avatar);
  if (data.removeAvatar) formData.append('removeAvatar', 'true');
  return formData;
};

const createAuthorApi = (data: CreateAuthorPayload) => {
  const formData = createFormData(data);
  return client.post<Author>('/manage/authors/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const updateAuthorApi = (payload: UpdateAuthorPayload) => {
  const formData = createFormData(payload.data);
  return client.post<Author>(`/manage/authors/edit?id=${payload.id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deleteAuthorApi = (payload: DeleteAuthorPayload) => {
  return client.delete(`/manage/authors/remove?id=${payload.id}`);
};

function* fetchAuthorSaga(action: FetchAuthorRequestAction) {
  try {
    const response: AxiosResponse<Author | Author[]> = yield call(fetchAuthorApi, action.payload);
    const data = response.data;
    const author = Array.isArray(data) ? data[0] : data;
    
    if (author) {
      yield put(fetchAuthorSuccess(author));
    } else {
      yield put(fetchAuthorFailure('Автор не найден'));
    }
  } catch (error) {
    const { message } = handleApiError(error, 'Ошибка получения данных автора');
    yield put(fetchAuthorFailure(message));
  }
}

function* createAuthorSaga(action: CreateAuthorRequestAction) {
  try {
    const response: AxiosResponse<Author> = yield call(createAuthorApi, action.payload);
    yield put(createAuthorSuccess(response.data));
    yield put(push('/authors'));
    yield put(fetchAuthorsRequest({ page: 1, perPage: 10 }));
  } catch (error) {
    const { message, validationErrors } = handleApiError(error, 'Ошибка создания автора');
    yield put(createAuthorFailure(message, validationErrors));
  }
}

function* updateAuthorSaga(action: UpdateAuthorRequestAction) {
  try {
    const response: AxiosResponse<Author> = yield call(updateAuthorApi, action.payload);
    yield put(updateAuthorSuccess(response.data));
    yield call([history, history.push], '/authors');
    yield put(fetchAuthorsRequest({ page: 1, perPage: 10 }));
  } catch (error) {
    const { message, validationErrors } = handleApiError(error, 'Ошибка обновления автора');
    yield put(updateAuthorFailure(message, validationErrors));
  }
}

function* deleteAuthorSaga(action: DeleteAuthorRequestAction) {
  try {
    yield call(deleteAuthorApi, action.payload);
    yield put(deleteAuthorSuccess(action.payload.id));
    yield put(fetchAuthorsRequest({ page: 1, perPage: 10 }));
  } catch (error) {
    const { message } = handleApiError(error, 'Ошибка удаления автора');
    yield put(deleteAuthorFailure(message));
  }
}

function* fetchAuthorsSaga(action: FetchAuthorsRequestAction) {
  try {
    const response: AxiosResponse<Author[]> = yield call(fetchAuthorsApi, action.payload);
    const pagination = extractPaginationFromHeaders(response.headers);
    yield put(fetchAuthorsSuccess({authors: response.data, pagination}));

  } catch (error) {
    const { message } = handleApiError(error, 'Ошибка загрузки авторов');
    yield put(fetchAuthorsFailure(message));
  }
}

export function* authorsSaga() {
  yield takeLatest(FETCH_AUTHORS_REQUEST, fetchAuthorsSaga);
  yield takeLatest(FETCH_AUTHOR_REQUEST, fetchAuthorSaga);
  yield takeLatest(CREATE_AUTHOR_REQUEST, createAuthorSaga);
  yield takeLatest(UPDATE_AUTHOR_REQUEST, updateAuthorSaga);
  yield takeLatest(DELETE_AUTHOR_REQUEST, deleteAuthorSaga);
}