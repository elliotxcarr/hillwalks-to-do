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
    completed_walks: Walk[];
}

export const initialUserState: UserState = {
    _id: '',
    username: '',
    password: '',
    name: '',
    age: 0,
    email: '',
    completed_walks: []
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
        completed_walks: user?.completed_walks
    })),

    on(addCompleteWalk, (state, {walk})=>({
        ...state,
        completed_walks: [...state.completed_walks, walk]
    })),

    on(setCompletedWalks, (state, {completedWalks}) => ({
        ...state,
        completedWalks
    }))
)