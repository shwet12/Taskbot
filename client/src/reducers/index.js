import { combineReducers } from 'redux';

import posts from './posts';
import app from './app';

export const reducers = combineReducers({ posts, app });