import { signalStoreFeature, type } from "@ngrx/signals";
import { withEffects } from "@ngrx/signals/events";
import { switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { authEvents } from "./auth.store";
import { getInjectableDeps } from "../../injectables";

export function withAuthEffects<_>() {
  return signalStoreFeature(
    type<{}>(),
    withEffects(store => {
      const inj = getInjectableDeps()
      return {
        loginRequest$: inj._events.on(authEvents.loginRequest).pipe(
          switchMap(({ payload: req }) => inj._authService.login(req).pipe(
            tapResponse({
              next: user => {
                store
                inj._userStore.setUser(user)
                inj._walkStore.fetchWalks()
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