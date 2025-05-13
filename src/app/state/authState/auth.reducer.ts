import { createReducer, on} from "@ngrx/store";
import { User } from "../../models/User";
import { loginRequest, loginSuccess, loginFailure, logOut } from "./auth.actions";

export interface AuthState{
    loggedInUser: User | null;
    loading: boolean;
    error:string | null
    
}

export const initialAuthState: AuthState = {
    loggedInUser: null,
    loading: false,
    error:null
}

export const authReducer = createReducer(
    initialAuthState,

    on(loginRequest, (state)=>({
        ...state,
        loggedInUser: null,
        loading: true,
        error:null
    })),

    on(loginSuccess, (state, { user })=>({
        ...state,
        loggedInUser: user,
        loading: false,
        error:null
    })),
    on(loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error,
      })),

    on(logOut, ()=> initialAuthState)
)