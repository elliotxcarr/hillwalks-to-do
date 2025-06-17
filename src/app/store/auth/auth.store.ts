import {patchState, signalStore, withMethods, withProps, withState} from '@ngrx/signals'
import { initialAuthSlice } from './auth.slice'
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { UserStore } from '../user/user.store';
import { WalkStore } from '../walk/walks.store';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { clearLoggedInUser, setError, setLoading } from './auth.updaters';
import { LoginRequest } from '../../models/LoginReq';

export const AuthStore = signalStore(
    {providedIn:'root'},
    withState(initialAuthSlice),

    withProps(_=>({
        _walkStore : inject(WalkStore),
        _userStore : inject(UserStore),
        _authService: inject(AuthService),
        _router: inject(Router)
    })),

    withMethods((store) => {
        const loginRequest = rxMethod<LoginRequest>(req =>{
            const output = req.pipe(
                tap(()=> patchState(store, setLoading(true))),
                switchMap((req) => store._authService.login(req.username, req.password)),
                tap((user:User)=> {
                    
                    store._userStore.setUser(user)
                    store._walkStore.loadWalks()
                    store._router.navigate(['home'])
                    patchState(store, setLoading(false))
                }),
                catchError(err=>{
                    const errorMsg = err.error?.error;
                    patchState(store, setError(errorMsg))
                    return EMPTY;
                })
            )
            return output
        })

        const performLogin = (request:LoginRequest) => {
            if(!request.username || !request.password){
                patchState(store, setError('Username and Password are required'));
                return;
            }
            loginRequest(request)
        }

        const logout =()=>{
            patchState(store, clearLoggedInUser());
            store._userStore.clearUser();
            store._router.navigate(['login']);
        }

        return{
            performLogin,
            logout
        }
    })
)