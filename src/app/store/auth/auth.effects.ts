import { signalStoreFeature, type } from "@ngrx/signals";
import { withEffects } from "@ngrx/signals/events";
import { switchMap} from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { authEvents } from "./auth.store";
import { getInjectableDeps } from "../../injectables";
import { inject } from "@angular/core";
import { UserStore } from "../user/user.store";
import { WalkStore } from "../walk/walks.store";

export function withAuthEffects<_>() {
  return signalStoreFeature(
    type<{}>(),
    withEffects(store => {
      const inj = getInjectableDeps()
      const _userStore = inject(UserStore);
      const _walkStore = inject(WalkStore);

      return {
        loginRequest$: inj._events.on(authEvents.loginRequest).pipe(
          switchMap(({ payload: req }) => inj._authService.login(req).pipe(
            tapResponse({
              next: user => {
                store
                _userStore.setUser(user)
                _walkStore.fetchWalks()
                inj._router.navigate(['home'])
              },
              error: (err: HttpErrorResponse) => {
                const errorMsg = err.error?.error;
                inj._dispatcher.dispatch(authEvents.loginFailure(errorMsg))
              }
            })
          ))
        )
      }
    })
  )
}