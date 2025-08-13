import { patchState, signalStore, withMethods, withProps, withState } from "@ngrx/signals";
import { initialUserSlice } from "./user.slice";
import { User } from "../../models/User";
import { Walk } from "../../models/Walk";
import { WalkService } from "../../services/walk.service";
import { inject } from "@angular/core";

export const UserStore = signalStore(
	{ providedIn: 'root' },
	withState(initialUserSlice),
	withProps(() => ({
		_walkService: inject(WalkService),
	})),
	withMethods((store) => {
		const saveCompletedWalk = (walk: Walk) => {
			patchState(store, (state) => ({
				completed_walks: [...state.completed_walks, walk],
			}));
			store._walkService.saveCompletedWalk(store.id(), walk._id).subscribe();
		};

		const removeCompletedWalk = (walk:Walk) => {
			patchState(store, (state) => ({
				completed_walks: state.completed_walks.filter(w => w._id !== walk._id)
			}));
			store._walkService.deleteCompletedWalk(store.id(), walk._id).subscribe();
		}
		const handleWalkComplete = ( walk:Walk ) => 
			!walk.completed ? saveCompletedWalk(walk) : removeCompletedWalk(walk)

		return {
			saveCompletedWalk,
			removeCompletedWalk,
			setUser: (user: User) => patchState(store, (user)),
			clearUser: () => patchState(store, ({})),
			handleWalkComplete
		};
	})
);