import { createAction , props} from "@ngrx/store";
import { User } from "../../models/User";
import { Walk } from "../../models/Walk";

export const initialiseUser = createAction(
    '[User] Initialise User',
    props<{user: User}>()
)

export const addCompleteWalk = createAction(
    '[User] Add Completed Walk',
    props<{walk: Walk}>()
)

export const logOutUser = createAction(
    '[User] Log out user'
)

export const getWalks = createAction(
    '[User] Get walks',
)

export const setWalks = createAction(
    '[User] Set Walks',
    props<{walks: Walk[]}>()
)

