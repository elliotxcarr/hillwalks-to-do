import { PartialStateUpdater } from "@ngrx/signals";
import { User } from "../../models/User";
import { UserSlice } from "./user.slice";

export function setUser(user: User): PartialStateUpdater<UserSlice> {
	return _ => (user)
}

export function clearUser(): PartialStateUpdater<UserSlice> {
	return _ => ({})
}