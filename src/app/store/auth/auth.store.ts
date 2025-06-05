import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals'
import { initialAuthSlice } from './auth.slice'
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { UserStore } from '../user/user.store';
import { SessionStore } from '../session/session.store';

export const AuthStore = signalStore(
    {providedIn:'root'},
    withState(initialAuthSlice),

    withComputed((store)=>{
        return{

        }
    }),

    withMethods((store, authService = inject(AuthService), router = inject(Router),) => {
        const userStore = inject(UserStore)
        const sessionStore = inject(SessionStore)
        const loginRequest = (username: string, password:string) => {
            patchState(store, ()=> ({loading: true}));

            if(!username || !password){
                patchState(store, ()=> ({error: 'Username and Password are required'}));
                return;
            } 

            authService.login(username, password).pipe(
                tap((user:User)=>{
                    userStore.setUser(user)
                    sessionStore.loadWalks()
                    router.navigate(['home'])
                }),
                finalize(()=>{
                    patchState(store, ()=> ({loading: false}))
                }),
                catchError(err=>{
                    const errorMsg = err.error?.error;
                    patchState(store, ()=>({error: errorMsg}))
                    return EMPTY;
                })
            ).subscribe()
        }

        return{
            loginRequest
        }
    })
)