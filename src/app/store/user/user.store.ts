import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { initialUserSlice } from "./user.slice";
import { User } from "../../models/User";
import { Walk } from "../../models/Walk";
import { WalkService } from "../../services/walk.service";
import { inject } from "@angular/core";
import { clearUser, setUser } from "./user.updaters";

export const UserStore = signalStore(
    {providedIn: 'root'},
    withState(initialUserSlice),

    withMethods((store, walkService = inject(WalkService))=>{

        const saveCompletedWalk = (walk: Walk) =>{
            patchState(store, (state)=> ({completed_walks: [...state.completed_walks, walk]}));
        
            walkService.saveCompletedWalk(store._id(), walk._id).subscribe()
        }

        return {
            saveCompletedWalk,
            setUser: (user:User) => patchState(store, setUser(user)),
            clearUser: ()=> patchState(store, clearUser())
        }
    })
)