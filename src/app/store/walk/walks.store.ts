import { patchState, signalStore, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
import { Walk } from "../../models/Walk";
import { computed, inject, Signal } from "@angular/core";
import { UserStore } from "../user/user.store";
import { WalkService } from "../../services/walk.service";
import { catchError, delay, EMPTY, pipe, switchMap, tap} from "rxjs";
import { initialWalkSlice } from "./walks.slice";
import { rxMethod} from '@ngrx/signals/rxjs-interop'
import { clearSelectedWalk, setSelectedWalk, setWalksLoading } from "./walks.updaters";

export const WalkStore = signalStore(
    {providedIn: 'root'},

    withState(initialWalkSlice),

    withProps(_ => ({
        _walkService : inject(WalkService),
        _userStore: inject(UserStore)
    })),

    withComputed((store) => {
        const walksToDisplay: Signal<Walk[]> = computed(() =>{
            const allWalks = store.walks() ?? [];
            const completed = store._userStore.completed_walks() ?? [];
            return allWalks.map((walk) => ({
                ...walk,
                completed: !!completed.find((cw) => cw._id === walk._id),
            }));
        });
        return {
            walksToDisplay,
        }
    }),

    withMethods((store) => {
        const fetchWalks = rxMethod<void>(pipe(
            tap(()=> patchState(store, setWalksLoading(true))),
            switchMap(()=> store._walkService.getAllWalks()),
            tap((wks) => {
                patchState(store, ({walks:wks, allWalks: wks}), setWalksLoading(false))
            }),
            catchError((err) => {
                console.error(err)
                return EMPTY
            })
        ))

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
        const loadWalks = () => {
            fetchWalks()
        }
        
        const searchForWalk = (searchTerm: string)=> {
            const allWalks = [...store.allWalks()];
            const searchResult = allWalks.filter(walk => 
                walk.name.toLowerCase().includes(searchTerm.toLowerCase()))
            patchState(store, ({walks: searchResult}))
        }

        return{
            loadWalks,
            sortWalks,
            setSelectedWalk: (walk:Walk) => patchState(store, setSelectedWalk(walk)),
            clearSelectedWalk: () => patchState(store, clearSelectedWalk()),
            searchForWalk,
            setWalksLoading: (isLoading:boolean) => patchState(store, setWalksLoading(isLoading))
        }
    })
)