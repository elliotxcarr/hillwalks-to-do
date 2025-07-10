import { signalStoreFeature, type } from "@ngrx/signals";
import { on, withReducer } from "@ngrx/signals/events";
import { setError, setLoading, setLoggedInUser } from "./auth.updaters";
import { authEvents } from "./auth.store";

export function withAuthReducer<_>(){
  return signalStoreFeature(
    type<{}>(),
    withReducer(
      on(authEvents.loginRequest, (_) => setLoading(true)),
      on(authEvents.loginSuccess, (event) => {
        setLoggedInUser(event.payload);
        setLoading(false)
        return{}
      }),
      on(authEvents.loginFailure, (event) => {
        setError(event.payload)
        setLoading(false)
        return{}
      })
    )
  )
}