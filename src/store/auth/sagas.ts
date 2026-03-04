import type { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import Cookies from 'js-cookie';
import client from '../../api/client';
import { loginSuccess, loginFailure } from './actions';
import { LOGIN_REQUEST, LOGOUT } from './types';
import type {LoginPayload } from './types';
import { handleApiError } from '../../utils/apiErrorHandler';

interface LoginApiResponse {
  access_token: string;
  refresh_token: string;
  token?: string;
}

const loginApi = (data: LoginPayload) => {
  return client.post<LoginApiResponse>('/auth/token-generate', data);
};

function* loginSaga(action: { type: typeof LOGIN_REQUEST, payload: LoginPayload }) {
  try {
    const response: AxiosResponse<LoginApiResponse> = yield call(loginApi, action.payload);
    
    const { access_token, refresh_token } = response.data;

    if (access_token) Cookies.set('token', access_token);
    if (refresh_token) Cookies.set('refresh_token', refresh_token);
    if (response.data.token) Cookies.set('token', response.data.token);

    yield put(loginSuccess());
    yield put(push('/'));
  } catch (error) {
    const { message, validationErrors } = handleApiError(error, 'Ошибка авторизации');
    yield put(loginFailure(message, validationErrors));
  }
}

function* logoutSaga() {
  Cookies.remove('token');
  Cookies.remove('refresh_token');
  yield put(push('/login'));
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}