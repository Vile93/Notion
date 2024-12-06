import { IUser } from '../../interfaces/IUser';
import { USER_ACTIONS } from './userActions';

export type UserStore = {
    isAuth: boolean;
    data: IUser | null;
};

type Action = { type: typeof USER_ACTIONS.SET_NEW_USER; payload: UserStore } & {
    type: typeof USER_ACTIONS.CLEAR_USER_DATA;
};

const initialState: UserStore = {
    isAuth: !!localStorage.getItem('jwt'),
    data: JSON.parse(localStorage.getItem('user') ?? 'null'),
};

export function userReducer(state = initialState, action: Action): UserStore {
    switch (action.type) {
        case USER_ACTIONS.SET_NEW_USER:
            return { ...state, ...action.payload };
        case USER_ACTIONS.CLEAR_USER_DATA:
            return {
                isAuth: false,
                data: null,
            };
        default:
            return state;
    }
}
