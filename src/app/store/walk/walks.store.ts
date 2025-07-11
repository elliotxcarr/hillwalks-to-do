import { patchState, signalStore, type, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { Walk } from "../../models/Walk";
import { computed, inject} from "@angular/core";
import { UserStore } from "../user/user.store";
import { initialWalkSlice } from "./walks.slice";
import { clearSelectedWalk, setSelectedWalk, setWalksLoading } from "./walks.updaters";
import {Dispatcher, eventGroup} from '@ngrx/signals/events';
import { withWalkEffects } from "./walks.effects";
import { withWalkReducer } from "./walks.reducer";

export const walkEvents = eventGroup({
  source: 'Walks',
  events: {
    load: type<void>(),
    loaded: type<Walk[]>()
  }
});

export const WalkStore = signalStore(
  { providedIn: 'root' },

  withState(initialWalkSlice),
  withProps(_ => ({
    _userStore: inject(UserStore),
    _dispatcher: inject(Dispatcher)
  })),
  withWalkEffects(),
  withWalkReducer(),
  withComputed(store => {
    const walksToDisplay = computed(() => {
      const walks = store._walks() ?? [];
      const completed = store._userStore.completed_walks() ?? [];

      const applyCompleted = (walks: Walk[]) =>
        walks.map(walk => ({
          ...walk,
          completed: !!completed.find(cw => cw._id === walk._id),
        }));

      const applySearchTerm = (walks: Walk[]) => {
        const term = store.searchTerm().toLowerCase();
        if (!term) return walks;
        return walks.filter(walk =>
          walk.name.toLowerCase().includes(term)
        );
      };

      const applySorting = (walks: Walk[]) => {
        switch (store.sortOption()?.toLowerCase()) {
          case 'rating':
            return [...walks].sort((a, b) => b.rating - a.rating);
          case 'level':
            return [...walks].sort((a, b) => b.difficulty - a.difficulty);
          case 'completed':
            return [...walks].sort((a, b) => Number(b.completed) - Number(a.completed));
          case 'todo':
            return [...walks].sort((a, b) => Number(a.completed) - Number(b.completed));
          default:
            return walks;
        }
      };

      const mergedComplete = applyCompleted(walks);
      const searchFiltered = applySearchTerm(mergedComplete);
      return applySorting(searchFiltered);
    });
    
    return {
      walksToDisplay
    }
  }),
  withMethods((store) => ({
    fetchWalks: () => store._dispatcher.dispatch(walkEvents.load()),
    sortWalks: (sortOption: string) => patchState(store, { sortOption }),
    setSelectedWalk: (walk: Walk) => patchState(store, setSelectedWalk(walk)),
    clearSelectedWalk: () => patchState(store, clearSelectedWalk()),
    searchForWalk: (searchTerm: string) => patchState(store, { searchTerm }),
    setWalksLoading: (isLoading: boolean) => patchState(store, setWalksLoading(isLoading))
  }))
)