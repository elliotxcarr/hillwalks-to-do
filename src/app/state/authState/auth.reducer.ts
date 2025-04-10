import { createReducer, on, State } from "@ngrx/store";
import { User } from "../../models/User";
import { loginRequest, loginSuccess, loginFailure } from "./auth.actions";

export interface AuthState{
    loggedInUser: User | null;
    loading: boolean;
    error:string | null
    
}

export const initialState: AuthState = {
    loggedInUser: null,
    loading: false,
    error:null
}

export const authReducer = createReducer(
    initialState,

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
        error: error,  // Store error message if login fails
      }))
)