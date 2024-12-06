import { AppStore } from '../store';

export const userSelector = (state: AppStore) => state;
export const userAuthSelector = (state: AppStore) => state.isAuth;
export const userDataSelector = (state: AppStore) => state.data;
