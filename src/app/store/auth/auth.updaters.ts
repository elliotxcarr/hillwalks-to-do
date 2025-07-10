import { PartialStateUpdater } from "@ngrx/signals";
import { AuthSlice } from "./auth.slice";
import { User } from "../../models/User";

export function setLoading(loading: boolean): PartialStateUpdater<AuthSlice>{
    return _ => ({loading})
}

export function setError(error:string): PartialStateUpdater<AuthSlice>{
    return _ => ({error})
}

export function clearLoggedInUser(): PartialStateUpdater<AuthSlice>{
    return _ => ({loggedInUser: null})
}

export function setLoggedInUser(loggedInUser:User): PartialStateUpdater<AuthSlice>{
    return _ => ({loggedInUser})
}