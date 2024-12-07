import { createStore } from 'redux';
import { userReducer } from './userReducer/userReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

export const store = createStore(userReducer, composeWithDevTools());
export type AppStore = ReturnType<typeof store.getState>;
