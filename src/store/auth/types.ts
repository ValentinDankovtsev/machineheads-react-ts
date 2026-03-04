export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const LOGOUT = 'auth/LOGOUT';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  validationErrors: ValidationError[] | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: LoginPayload;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: {
    error: string;
    validationErrors: ValidationError[] | null;
  };
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = 
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;