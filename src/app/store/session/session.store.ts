import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Walk } from "../../models/Walk";
import { computed, inject, Signal } from "@angular/core";
import { UserStore } from "../user/user.store";
import { WalkService } from "../../services/walk.service";
import { catchError, EMPTY, tap } from "rxjs";
import { User } from "../../models/User";

interface sessionSlice {
    walks: Walk[],
}

const initialSessionSlice: sessionSlice = {
    walks: [],
}
//could add a logged in user to this


export const SessionStore = signalStore(
    {providedIn: 'root'},

    withState(initialSessionSlice),

    withComputed((store, userStore = inject(UserStore)) => {
        const walksToDisplay: Signal<Walk[]> = computed(() =>{
            const allWalks = store.walks() ?? [];
            const completed = userStore.completed_walks() ?? [];
            return allWalks.map((walk) => ({
                ...walk,
                completed: !!completed.find((cw) => cw._id === walk._id),
            }));
        });

        return {
            walksToDisplay,
        }
        
    }),

    withMethods((store, walkService = inject(WalkService)) => {
        const loadWalks = ()=> {
            walkService.getAllWalks().pipe(
                tap((wks) => {
                    patchState(store, () => ({walks: wks}))
                }),
                catchError((err) => {
                    console.error(err)
                    return EMPTY
                })
            ).subscribe()
        }

        return{
            loadWalks
        }
    })
)