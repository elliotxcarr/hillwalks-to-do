import { inject } from "@angular/core";
import { patchState, signalStoreFeature, type } from "@ngrx/signals";
import { Dispatcher, Events, withEffects } from "@ngrx/signals/events";
import { walkConfig, walkEvents } from "./walks.store";
import { catchError, EMPTY, switchMap, tap } from "rxjs";
import { setAllEntities } from "@ngrx/signals/entities";
import { WalkService } from "../../services/walk.service";

export function withWalkEffects<_>() {
  return signalStoreFeature(
    type<{}>(),
    withEffects(store => {
      const _events = inject(Events)
      const _dispatcher = inject(Dispatcher)
      const _walkService = inject(WalkService)
      return {
        fetchWalks$:  _events.on(walkEvents.load).pipe(
          switchMap(() => _walkService.getAllWalks().pipe(
            tap((wks) => {
            patchState(store, setAllEntities(wks, walkConfig))
            _dispatcher.dispatch(walkEvents.loaded(wks))
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