import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";
import { User } from "../../models/User";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserName = createSelector(selectUserState, (state) => state.name);

export const selectUserId = createSelector(selectUserState, (state) => state._id);

export const getCompletedWalks = createSelector(selectUserState, (state) => state.completed_walks);

export const getUser = createSelector(selectUserState, (state) => state as User);