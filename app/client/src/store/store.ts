import { createStore } from 'redux';
import { userReducer } from './userReducer/userReducer';

export const store = createStore(userReducer);
export type AppStore = ReturnType<typeof store.getState>;
