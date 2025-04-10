import { createAction , props} from "@ngrx/store";
import { User } from "../../models/User";

export const initialiseUser = createAction(
    '[User] Initialise User',
    props<{user: User | null}>()
)