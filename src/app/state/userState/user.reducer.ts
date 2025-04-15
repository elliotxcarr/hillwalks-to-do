import { createReducer, on } from "@ngrx/store";
import { Walk } from "../../models/Walk";
import { addCompleteWalk, initialiseUser, setCompletedWalks } from "./user.actions";

export interface UserState{
    _id?: string;
    username?: string;
    password?: string;
    name?: string;
    age?: number;
    email?: string;
    completedWalks: Walk[];
}

export const initialUserState: UserState = {
    _id: '',
    username: '',
    password: '',
    name: '',
    age: 0,
    email: '',
    completedWalks: []
}

export const userReducer = createReducer(
    initialUserState,

    on(initialiseUser, (state, {user})=>({
        ...state,
        _id: user?._id,
        username: user?.username,
        password: user?.password,
        name: user?.name,
        age: user?.age,
        email: user?.email,
        completedWalks: user?.completedWalks ?? []
    })),

    on(addCompleteWalk, (state, {walk})=>({
        ...state,
        completedWalks: [...state.completedWalks, walk]
    })),

    on(setCompletedWalks, (state, {completedWalks}) => ({
        ...state,
        completedWalks
    }))
)