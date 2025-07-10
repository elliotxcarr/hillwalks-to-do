import { signalStoreFeature, type } from "@ngrx/signals";
import { on, withReducer } from "@ngrx/signals/events";
import { authEvents } from "./auth.store";
import { AuthSlice } from "./auth.slice";

export function withAuthReducer<_>(){
  return signalStoreFeature(
    type<{state:AuthSlice}>(),
    withReducer(
      on(authEvents.loginRequest, (_) => ({loading: true})),
      on(authEvents.loginFailure, (event) => ({error: event.payload, loading: false}))
    )
  )
}