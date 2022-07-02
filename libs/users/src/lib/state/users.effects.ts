import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { UsersService } from '../services/users.service';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
    buildUsersSession$ = createEffect( () => { return this.actions$.pipe(
        ofType(UsersActions.buildUserSession), 
        concatMap(() => {
            if(this.localStorageService.isValidToken()) {
                const userId = this.localStorageService.getUserIdFromToken();
                if (userId) {
                    return this.usersService.getUser(userId).pipe(
                        map((user) => {
                            return UsersActions.buildUserSessionSuccess({ user: user});
                        }),
                        catchError(() => of(UsersActions.buildUserSessionFailure()))
                    )
                } else {
                    return of(UsersActions.buildUserSessionFailure());
                }
            } else {
                return of(UsersActions.buildUserSessionFailure());
            }
        })
    )});

    constructor(
        private readonly actions$: Actions, 
        private localStorageService: LocalStorageService,
        private usersService: UsersService
    ) {}
}
