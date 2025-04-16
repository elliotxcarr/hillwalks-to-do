import { createAction, props } from "@ngrx/store";
import { User } from "../../models/User";

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{user:User}>()
);

export const loginRequest = createAction(
    '[Auth] Login Request',
    props<{username:string; password:string}>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{error: string}>()
)
