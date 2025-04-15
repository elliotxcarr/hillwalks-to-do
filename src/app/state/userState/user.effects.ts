import { inject, Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import * as UserActions from './user.actions';
import { catchError, EMPTY,exhaustMap,map,switchMap, tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectUserId } from "./user.selectors";
import { WalkService } from "../../services/walk.service";
import { UserService } from "../../services/user.service";

@Injectable()
export class UserEffects{
    private actions$: Actions = inject(Actions)
    private store = inject(Store)
    private walkService: WalkService = inject(WalkService)

    // addCompletedWalkToDB$ = createEffect(()=>
    //   this.actions$.pipe(
    //     ofType(UserActions.addCompleteWalk),
    //     withLatestFrom(this.store.select(selectUserId)),
    //     switchMap(([{walk}, userId]) =>
    //       this.walkService.saveCompletedWalk(userId!, walk).pipe(
    //         catchError( err => {
    //           console.error(err)
    //           return EMPTY
    //         })
    //       )
    //     )
    //   ), {dispatch: false}
    // );

    refreshCompletedWalks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.addCompleteWalk),
        withLatestFrom(this.store.select(selectUserId)),
        switchMap(([_, userId]) =>
          this.walkService.getCompletedWalks(userId!).pipe(
            map(completedWalks =>
              UserActions.setCompletedWalks({ completedWalks })
            ),
            catchError(err => {
              console.error('Error fetching completed walks:', err);
              return EMPTY;
            })
          )
        )
      )
    );
    
}