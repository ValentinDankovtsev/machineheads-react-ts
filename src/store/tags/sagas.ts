import { call, put, takeLatest } from 'redux-saga/effects';
import type { AxiosResponse } from 'axios';
import client from '../../api/client';
import {
  fetchTagsSuccess,
  fetchTagsFailure,
  fetchTagSuccess,
  fetchTagFailure,
  createTagSuccess,
  createTagFailure,
  updateTagSuccess,
  updateTagFailure,
  deleteTagSuccess,
  deleteTagFailure,
  fetchTagsRequest,
} from './actions';
import {
  FETCH_TAGS_REQUEST,
  FETCH_TAG_REQUEST,
  CREATE_TAG_REQUEST,
  UPDATE_TAG_REQUEST,
  DELETE_TAG_REQUEST,
  type Tag,
  type FetchTagsPayload,
  type FetchTagRequestAction,
  type CreateTagRequestAction,
  type UpdateTagRequestAction,
  type DeleteTagRequestAction,
} from './types';
import { handleApiError } from '../../utils/apiErrorHandler';
import { extractPaginationFromHeaders } from '../../utils/paginationUtils';
import history from '../../utils/history';

const fetchTagsApi = (params: FetchTagsPayload) => {
  return client.get<Tag[]>('/manage/tags', {
    params
  });
};

const fetchTagApi = (id: number) => {
  return client.get<Tag | Tag[]>(`/manage/tags/detail?id=${id}`);
};

const createTagApi = (data: CreateTagRequestAction['payload']) => {
  return client.post<Tag>('/manage/tags', data);
};

const updateTagApi = (id: number, data: UpdateTagRequestAction['payload']['data']) => {
  return client.post<Tag>(`/manage/tags/edit?id=${id}`, data);
};

const deleteTagApi = (id: number) => {
  return client.delete(`/manage/tags/remove?id=${id}`);
};

function* fetchTagsSaga(action: { type: typeof FETCH_TAGS_REQUEST, payload: FetchTagsPayload }) {   
  try {
    const response: AxiosResponse<Tag[]> = yield call(fetchTagsApi, action.payload);
    const pagination = extractPaginationFromHeaders(response.headers);
    yield put(fetchTagsSuccess({tags: response.data, pagination}));
  } catch (error) {
    const { message } = handleApiError(error, 'Ошибка загрузки тегов');
    yield put(fetchTagsFailure(message));
  }
}

function* fetchTagSaga(action: FetchTagRequestAction) {
  try {
    const response: AxiosResponse<Tag | Tag[]> = yield call(fetchTagApi, action.payload);
    const data = response.data;
    const tag = Array.isArray(data) ? data[0] : data;

    if (tag) {
      yield put(fetchTagSuccess(tag));
    } else {
      yield put(fetchTagFailure('Тег не найден'));
    }
  } catch (error) {
    const { message } = handleApiError(error, 'Ошибка получения данных тега');
    yield put(fetchTagFailure(message));
  }
}

function* createTagSaga(action: CreateTagRequestAction) {
  try {
    const response: AxiosResponse<Tag> = yield call(createTagApi, action.payload);
    yield put(createTagSuccess(response.data));
    history.push('/tags');
    yield put(fetchTagsRequest());
  } catch (error) {
    const { message, validationErrors } = handleApiError(error, 'Ошибка создания тега');
    yield put(createTagFailure(message, validationErrors));
  }
}

function* updateTagSaga(action: UpdateTagRequestAction) {
  try {
    const response: AxiosResponse<Tag> = yield call(updateTagApi, action.payload.id, action.payload.data);
    yield put(updateTagSuccess(response.data));
    history.push('/tags');
    yield put(fetchTagsRequest());
  } catch (error) {
    const { message, validationErrors } = handleApiError(error, 'Ошибка обновления тега');
    yield put(updateTagFailure(message, validationErrors));
  }
}

function* deleteTagSaga(action: DeleteTagRequestAction) {
  try {
    yield call(deleteTagApi, action.payload.id);
    yield put(deleteTagSuccess(action.payload.id));
    yield put(fetchTagsRequest());
  } catch (error) {
    const { message } = handleApiError(error, 'Ошибка удаления тега');
    yield put(deleteTagFailure(message));
  }
}

export function* tagsSaga() {
  yield takeLatest(FETCH_TAGS_REQUEST, fetchTagsSaga);
  yield takeLatest(FETCH_TAG_REQUEST, fetchTagSaga);
  yield takeLatest(CREATE_TAG_REQUEST, createTagSaga);
  yield takeLatest(UPDATE_TAG_REQUEST, updateTagSaga);
  yield takeLatest(DELETE_TAG_REQUEST, deleteTagSaga);
}