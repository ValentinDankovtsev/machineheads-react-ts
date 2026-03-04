import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { History } from 'history';
import { authReducer } from './auth/reducer';
import { postsReducer } from './posts/reducer';
import { tagsReducer } from './tags/reducer';
import { authorsReducer } from './authors/reducer';

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  posts: postsReducer,
  tags: tagsReducer,
  authors: authorsReducer,
});

export default createRootReducer;