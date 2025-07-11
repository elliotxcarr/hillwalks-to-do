import { signalStoreFeature, type} from "@ngrx/signals";
import { withEffects } from "@ngrx/signals/events";
import { walkEvents} from "./walks.store";
import { switchMap } from "rxjs";
import { getInjectableDeps } from "../../injectables";
import { WalkSlice } from "./walks.slice";
import { mapResponse } from "@ngrx/operators";

export function withWalkEffects<_>() {
  return signalStoreFeature(
    type<{state:WalkSlice}>(),
    withEffects(_ => {
      const inj = getInjectableDeps()
      return {
        fetchWalks$:  inj._events.on(walkEvents.load).pipe(
          switchMap(() => inj._walkService.getAllWalks().pipe(
            mapResponse({
                next: (wks) =>{
                  return walkEvents.loaded(wks)
                },
                error: console.error,
            }),
          )))
      }
    })
  )
}