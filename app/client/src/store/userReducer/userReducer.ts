import { IUser } from '../../interfaces/IUser';
import { USER_ACTIONS } from './userActions';

type UserStore = {
    isAuth: boolean;
    data: IUser | null;
};

export type Action =
    | {
          type: typeof USER_ACTIONS.SET_DATA;
          payload: UserStore;
      }
    | {
          type: typeof USER_ACTIONS.CLEAR_USER_DATA;
      }
    | { type: typeof USER_ACTIONS.CHANGE_AUTH; payload: boolean }
    | { type: typeof USER_ACTIONS.AUTH }
    | { type: typeof USER_ACTIONS.UNAUTH };

const initialState: UserStore = {
    isAuth: !!localStorage.getItem('jwt'),
    data: JSON.parse(localStorage.getItem('user') ?? 'null'),
};

export function userReducer(state = initialState, action: Action) {
    switch (action.type) {
        case USER_ACTIONS.SET_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case USER_ACTIONS.CLEAR_USER_DATA:
            return {
                isAuth: false,
                data: null,
            };
        case USER_ACTIONS.CHANGE_AUTH:
            return { ...state, isAuth: action.payload };
        case USER_ACTIONS.AUTH:
            return { ...state, isAuth: true };
        case USER_ACTIONS.UNAUTH:
            return { ...state, isAuth: false };
        default:
            return state;
    }
}
