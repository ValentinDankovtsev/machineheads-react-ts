import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';
import type { LoginPayload, AuthActionTypes, ValidationError } from './types';

export const loginRequest = (payload: LoginPayload): AuthActionTypes => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = (error: string, validationErrors: ValidationError[] = []): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  payload: { error, validationErrors },
});

export const logout = (): AuthActionTypes => ({
  type: LOGOUT,
});