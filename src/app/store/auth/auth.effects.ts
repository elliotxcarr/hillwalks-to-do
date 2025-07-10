import { signalStoreFeature, type } from "@ngrx/signals";
import { Dispatcher, Events, withEffects } from "@ngrx/signals/events";
import { AuthService } from "../../services/auth.service";
import { switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { authEvents } from "./auth.store";
import { WalkStore } from "../walk/walks.store";
import { UserStore } from "../user/user.store";
import { Router } from "@angular/router";

export function withAuthEffects<_>() {
  return signalStoreFeature(
    type<{}>(),
    withEffects(_ => {
      const _events = inject(Events);
      const _authService = inject(AuthService);
      const _walkStore = inject(WalkStore);
      const _userStore = inject(UserStore);
      const _router = inject(Router);
      const _dispatcher = inject(Dispatcher);

      return {
        loginRequest$: _events.on(authEvents.loginRequest).pipe(
          tap(() => console.log('in login')),
          switchMap(({ payload: req }) => _authService.login(req).pipe(
            tapResponse({
              next: user => {
                _userStore.setUser(user)
                _walkStore.fetchWalks()
                _router.navigate(['home'])
                _dispatcher.dispatch(authEvents.loginSuccess(user))
              },
              error: (err: HttpErrorResponse) => {
                const errorMsg = err.error?.error;
                _dispatcher.dispatch(authEvents.loginFailure(errorMsg))
                console.log(errorMsg)
              }
            })
          ))
        )
      }
    })
  )
}