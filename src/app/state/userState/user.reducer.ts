import { createReducer, on } from "@ngrx/store";
import { Walk } from "../../models/Walk";
import { initialiseUser } from "./user.actions";

export interface UserState{
    id: string | null | undefined;
    username: string | null| undefined;
    name: string | null| undefined;
    age: number | null| undefined;
    email: string | null| undefined;
    completedWalks: Walk[] | null| undefined;
}

export const initialUserState: UserState = {
    id: null,
    username: null,
    name: null,
    age: null,
    email: null,
    completedWalks: null
}

export const userReducer = createReducer(
    initialUserState,

    on(initialiseUser, (state, {user})=>({
        ...state,
        id: user?.id,
        username: user?.username,
        name: user?.name,
        age: user?.age,
        email: user?.email,
        completedWalks: user?.completedWalks
    }))
)