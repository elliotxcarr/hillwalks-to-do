import { patchState, signalStoreFeature, type } from "@ngrx/signals";
import { withEffects } from "@ngrx/signals/events";
import { walkConfig, walkEvents } from "./walks.store";
import { catchError, EMPTY, switchMap, tap } from "rxjs";
import { setAllEntities } from "@ngrx/signals/entities";
import { getInjectableDeps } from "../../injectables";

export function withWalkEffects<_>() {
  return signalStoreFeature(
    type<{}>(),
    withEffects(store => {
      const inj = getInjectableDeps()
      return {
        fetchWalks$:  inj._events.on(walkEvents.load).pipe(
          switchMap(() => inj._walkService.getAllWalks().pipe(
            tap((wks) => {
            patchState(store, setAllEntities(wks, walkConfig))
            inj._dispatcher.dispatch(walkEvents.loaded(wks))
          }),
          catchError((err) => {
            console.error(err);
            return EMPTY
          })
          )),
          
        )
      }
    })
  )
}