import { signalStoreFeature, type } from "@ngrx/signals";
import { WalkSlice } from "./walks.slice";
import { on, withReducer } from "@ngrx/signals/events";
import { walkEvents } from "./walks.store";

export function withWalkReducer<_>(){
  return signalStoreFeature(
    type<{state: WalkSlice}>(),
    withReducer(
      on(walkEvents.load, (_) => ({isLoading: true})),
      on(walkEvents.loaded, (event) => ({_walks: event.payload, isLoading: false}))
    )
  )
} 