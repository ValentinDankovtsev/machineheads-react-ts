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
  type AuthorsState,
  type AuthorsActionTypes,
} from './types';

const initialState: AuthorsState = {
  authors: [],
  currentAuthor: null,
  loading: false,
  authorLoading: false,
  error: null,
  validationErrors: null,
  pagination: {
    currentPage: 1,
    perPage: 20,
    totalCount: 0,
  },
};

export const authorsReducer = (state = initialState, action: AuthorsActionTypes): AuthorsState => {
  switch (action.type) {
    case FETCH_AUTHORS_REQUEST:
    case CREATE_AUTHOR_REQUEST:
    case UPDATE_AUTHOR_REQUEST:
    case DELETE_AUTHOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        validationErrors: null,
      };
    case FETCH_AUTHOR_REQUEST:
      return {
        ...state,
        authorLoading: true,
        error: null,
        validationErrors: null,
        currentAuthor: null,
      };
    case FETCH_AUTHOR_SUCCESS:
      return {
        ...state,
        authorLoading: false,
        currentAuthor: action.payload,
      };
    case FETCH_AUTHORS_SUCCESS:
      return {
        ...state,
        loading: false,
        authors: action.payload.authors,
        pagination: action.payload.pagination,
      };
    case CREATE_AUTHOR_SUCCESS:
    case UPDATE_AUTHOR_SUCCESS:
    case DELETE_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        validationErrors: null,
      };
    case CREATE_AUTHOR_FAILURE:
    case UPDATE_AUTHOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        validationErrors: action.payload.validationErrors,
      };
    case FETCH_AUTHOR_FAILURE:
      return {
        ...state,
        authorLoading: false,
        error: action.payload,
        validationErrors: null,
      };
    case FETCH_AUTHORS_FAILURE:
    case DELETE_AUTHOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        validationErrors: null,
      };
    default:
      return state;
  }
};