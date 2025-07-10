import { patchState, signalStore, withMethods, withProps, withState } from "@ngrx/signals";
import { initialUserSlice } from "./user.slice";
import { User } from "../../models/User";
import { Walk } from "../../models/Walk";
import { WalkService } from "../../services/walk.service";
import { inject } from "@angular/core";
import { clearUser, setUser } from "./user.updaters";

export const UserStore = signalStore(
    {providedIn: 'root'},
    withState(initialUserSlice),
    withProps(()=> ({
        _walkService :inject(WalkService)
    })),
    withMethods((store)=>{

        const saveCompletedWalk = (walk: Walk) =>{
            patchState(store, (state)=> ({completed_walks: [...state.completed_walks, walk]}));
        
            store._walkService.saveCompletedWalk(store._id(), walk._id).subscribe()
        }

        return {
            saveCompletedWalk,
            setUser: (user:User) => patchState(store, setUser(user)),
            clearUser: ()=> patchState(store, clearUser())
        }
    })
)