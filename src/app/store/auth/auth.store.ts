import {patchState, signalStore, type, withMethods, withProps, withState} from '@ngrx/signals'
import { initialAuthSlice } from './auth.slice'
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../user/user.store';
import { LoginRequest } from '../../models/LoginReq';
import { Dispatcher, eventGroup} from '@ngrx/signals/events';
import { User } from '../../models/User';
import { withAuthEffects } from './auth.effects';
import { withAuthReducer } from './auth.reducer';

export const authEvents = eventGroup({
    source:'Auth',
    events:{
        loginRequest: type<LoginRequest>(),
        loginSuccess: type<User>(),
        loginFailure: type<string>()
    }
})

export const AuthStore = signalStore(
  {providedIn:'root'},
  withState(initialAuthSlice),

  withProps(_=>({
    _userStore : inject(UserStore),
    _router: inject(Router),
    _dispatcher: inject(Dispatcher)
  })),
  withAuthEffects(),
  withAuthReducer(),
  withMethods((store) => {

  const performLogin = (request:LoginRequest) => {
      if(!request.username || !request.password){
          patchState(store, {error:'Username and Password are required'});
          return;
      }
      store._dispatcher.dispatch(authEvents.loginRequest(request))
  }

  const logout =()=>{
      patchState(store, ({loggedInUser: null}));
      store._userStore.clearUser();
      store._router.navigate(['login']);
  }

  return{
      performLogin,
      logout
    }
  })
)