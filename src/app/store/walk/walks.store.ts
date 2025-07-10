import { patchState, signalStore, type, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
import { Walk } from "../../models/Walk";
import { computed, inject} from "@angular/core";
import { UserStore } from "../user/user.store";
import { WalkService } from "../../services/walk.service";
import { catchError, EMPTY, pipe, switchMap, tap} from "rxjs";
import { initialWalkSlice } from "./walks.slice";
import { rxMethod} from '@ngrx/signals/rxjs-interop';
import { clearSelectedWalk, setSelectedWalk, setWalksLoading } from "./walks.updaters";
import {entityConfig, setAllEntities, withEntities,} from '@ngrx/signals/entities';
import {Dispatcher, eventGroup, Events, on, withEffects, withReducer} from '@ngrx/signals/events';
import { withWalkEffects } from "./walks.effects";
import { withWalkReducer } from "./walks.reducer";

export const walkConfig = entityConfig({
    entity: type<Walk>(),
    collection: '_walks',
    selectId:(walk) => walk._id
})

export const walkEvents = eventGroup({
    source: 'Walks',
    events:{
        load: type<void>(),
        loaded:type<Walk[]>()
    }
});


export const WalkStore = signalStore(
    {providedIn: 'root'},

    withState(initialWalkSlice),
    withProps(_ => ({
        _userStore: inject(UserStore),
        _dispatcher: inject(Dispatcher)
    })),
    withEntities(walkConfig),
    withWalkEffects(),
    withWalkReducer(),
    withComputed(store => {
        const walksToDisplay = computed(() => {
            const walks = store._walksEntities() ?? [];
            const completed = store._userStore.completed_walks() ?? [];

            let walksWithCompleted = walks.map((walk) => ({
                ...walk,
                completed: !!completed.find((cw) => cw._id === walk._id),
            }));

            if (store.searchTerm()) {
                walksWithCompleted = walks.filter(walk =>
                    walk.name.toLowerCase().includes(store.searchTerm())
                );
            }

            switch (store.sortOption()?.toLowerCase()) {
                case 'rating':
                    return [...walksWithCompleted].sort((a, b) => b.rating - a.rating);
                case 'level':
                    return [...walksWithCompleted].sort((a, b) => b.difficulty - a.difficulty);
                case 'completed':
                    return [...walksWithCompleted].sort((a, b) => Number(b.completed) - Number(a.completed));
                case 'todo':
                    return [...walksWithCompleted].sort((a, b) => Number(a.completed) - Number(b.completed));
                default:
                    return walksWithCompleted;
            }
        })
        return {
            walksToDisplay
        }
    }),
    withMethods((store) => {
        const sortWalks = (sortOption:string) => {
            patchState(store, { sortOption });
        }

        const searchForWalk = (searchTerm: string)=> {
            patchState(store, {searchTerm})
        }

        return{
            fetchWalks: () => store._dispatcher.dispatch(walkEvents.load()),
            sortWalks,
            setSelectedWalk: (walk:Walk) => patchState(store, setSelectedWalk(walk)),
            clearSelectedWalk: () => patchState(store, clearSelectedWalk()),
            searchForWalk,
            setWalksLoading: (isLoading:boolean) => patchState(store, setWalksLoading(isLoading))
        }
    })
)