import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CLEAR_POST_DETAILS,
  type PostsState,
  type PostsActionTypes,
} from './types';

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  loading: false,
  postLoading: false,
  error: null,
  validationErrors: null,
  pagination: {
    currentPage: 1,
    pageCount: 1,
    perPage: 10,
    totalCount: 0,
  },
};

export const postsReducer = (state = initialState, action: PostsActionTypes): PostsState => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
    case CREATE_POST_REQUEST:
    case UPDATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        validationErrors: null,
      };
    case FETCH_POST_REQUEST:
      return {
        ...state,
        postLoading: true,
        error: null,
        currentPost: null,
        validationErrors: null,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
        pagination: action.payload.pagination,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        postLoading: false,
        currentPost: action.payload,
      };
    case CREATE_POST_SUCCESS:
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case FETCH_POSTS_FAILURE:
    case DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_POST_FAILURE:
      return {
        ...state,
        postLoading: false,
        error: action.payload,
      };
    case CREATE_POST_FAILURE:
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        validationErrors: action.payload.validationErrors,
      };
    case CLEAR_POST_DETAILS:
      return {
        ...state,
        currentPost: null,
        error: null,
        validationErrors: null,
      };
    default:
      return state;
  }
};