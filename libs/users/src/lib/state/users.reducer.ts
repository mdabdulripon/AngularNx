import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { IUser } from '../models/user';

import * as UsersActions from './users.actions';


export const USERS_FEATURE_KEY = 'users';

export interface UserState {
    user: IUser | null;
    isAuthenticated: boolean;
}

export interface UserPartialState {
    readonly [USERS_FEATURE_KEY]: UserState;
}

export const initialUserState: UserState = {
    user: null,
    isAuthenticated: false
}

const usersReducer = createReducer(
    initialUserState,
    on(UsersActions.buildUserSession, (state) => ({ ...state })),
    on(UsersActions.buildUserSessionSuccess, (state, action) => ({
        ...state,
        user: action.user,
        isAuthenticated: true
    })),
    on(UsersActions.buildUserSessionFailure, (state) => ({
        ...state,
        user: null,
        isAuthenticated: false
    }))
)


export function reducer(state: UserState | undefined, action: Action) {
    return usersReducer(state, action);
}
