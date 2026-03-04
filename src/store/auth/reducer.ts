import Cookies from 'js-cookie';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';
import type { AuthState, AuthActionTypes } from './types';

const initialState: AuthState = {
  loading: false,
  error: null,
  validationErrors: null,
  isAuthenticated: !!Cookies.get('token'),
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        validationErrors: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        validationErrors: null,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        validationErrors: action.payload.validationErrors,
        isAuthenticated: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};