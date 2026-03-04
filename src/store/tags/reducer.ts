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
  type TagsState,
  type TagsActionTypes,
} from './types';

const initialState: TagsState = {
  tags: [],
  currentTag: null,
  loading: false,
  tagLoading: false,
  error: null,
  validationErrors: null,
  pagination: {
    currentPage: 1,
    perPage: 20,
    totalCount: 0,
  },
};

export const tagsReducer = (state = initialState, action: TagsActionTypes): TagsState => {
  switch (action.type) {
    case FETCH_TAGS_REQUEST:
    case CREATE_TAG_REQUEST:
    case UPDATE_TAG_REQUEST:
    case DELETE_TAG_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        validationErrors: null,
      };
    case FETCH_TAG_REQUEST:
      return {
        ...state,
        tagLoading: true,
        error: null,
        currentTag: null,
        validationErrors: null,
      };
    case FETCH_TAGS_SUCCESS:
      return {
        ...state,
        loading: false,
        tags: action.payload.tags,
        pagination: action.payload.pagination,
      };
    case FETCH_TAG_SUCCESS:
      return {
        ...state,
        tagLoading: false,
        currentTag: action.payload,
      };
    case CREATE_TAG_SUCCESS:
    case UPDATE_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TAG_SUCCESS:
      return {
        ...state,
        loading: false,
        tags: state.tags.filter((tag) => tag.id !== action.payload),
      };
    case FETCH_TAGS_FAILURE:
    case DELETE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TAG_FAILURE:
      return {
        ...state,
        tagLoading: false,
        error: action.payload,
      };
    case CREATE_TAG_FAILURE:
    case UPDATE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        validationErrors: action.payload.validationErrors,
      };
    default:
      return state;
  }
};