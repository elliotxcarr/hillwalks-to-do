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

export const setCompletedWalks = createAction(
    '[User] Set Completed Walks',
    props<{completedWalks: Walk[]}>()
)

export const logOutUser = createAction(
    '[User] Log out user'
)
