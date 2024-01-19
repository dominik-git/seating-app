import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { EMPTY, Observable } from 'rxjs';
// import { StateEnum } from '../../../../enums/state.enum';
// import { PlaceModel } from '../../../../api/place-model';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { UserViewModel } from '../../../api-generated/models/user-view-model';
import { UserService } from '../../../api-generated/services/user.service';

export interface PlacesStoreState {
  users: UserViewModel[];
  isLoading: boolean;
}

@Injectable()
export class UsersStore extends ComponentStore<PlacesStoreState> {
  constructor(private readonly userService: UserService) {
    super({
      users: [],
      isLoading: false,
    });
  }

  // SELECTORS
  readonly selectIsLoading$: Observable<boolean> = this.select(
    state => state.isLoading
  );

  readonly selectUsers$ = this.select(state => state.users);

  // ACTIONS
  readonly loadUsers$ = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() => {
        return this.userService.apiUserGetAllGet$Json$Response().pipe(
          tapResponse(
            response => {
              this.setUsers(response.body.data);
            },
            error => {
              this.setLoading(false);
              return EMPTY;
            }
          ),
          catchError(() => EMPTY)
        );
      })
    )
  );

  // REDUCERS
  readonly setUsers = this.updater((state, users: UserViewModel[]) => {
    return {
      ...state,
      users,
      isLoading: false,
    };
  });

  readonly setLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));
}
