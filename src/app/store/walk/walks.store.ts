import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Walk } from "../../models/Walk";
import { computed, inject, Signal } from "@angular/core";
import { UserStore } from "../user/user.store";
import { WalkService } from "../../services/walk.service";
import { catchError, EMPTY, tap } from "rxjs";
import { User } from "../../models/User";

interface WalkSlice {
    walks: Walk[],
    selectedWalk: Walk | null
}

const initialSessionSlice: WalkSlice = {
    walks: [],
    selectedWalk: null
}

export const WalkStore = signalStore(
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

        const sortWalks = (sortOption:string) => {
            const walks = store.walksToDisplay();
            switch (sortOption.toLowerCase()) {
            case 'rating':
                return patchState(store, {walks: [...walks].sort((a, b) => b.rating - a.rating)}) ;
            case 'level':
                return patchState(store, {walks: [...walks].sort((a, b) => b.difficulty - a.difficulty)});
            case 'completed':
                return patchState(store, {walks: [...walks].sort((a, b) => Number(b.completed) - Number(a.completed))});
            case 'todo':
                return patchState(store, {walks: [...walks].sort((a, b) => Number(a.completed) - Number(b.completed))});
            default:
                return walks;
            }
        }

        const setSelectedWalk = (walk: Walk) => {
            patchState(store, { selectedWalk: walk});
        }
        
        const clearSelectedWalk = () => {
            patchState(store, { selectedWalk: null});
        }
        

        return{
            loadWalks,
            sortWalks,
            setSelectedWalk,
            clearSelectedWalk
        }
    })
)