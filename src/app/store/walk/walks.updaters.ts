import { PartialStateUpdater } from "@ngrx/signals"
import { WalkSlice } from "./walks.slice"
import { Walk } from "../../models/Walk"

export function setWalksLoading(isLoading: boolean): PartialStateUpdater<WalkSlice>{
    return _ => ({isLoading})
}

export function setSelectedWalk(selectedWalk:Walk):PartialStateUpdater<WalkSlice>{
    return _ => ({selectedWalk})
}

export function clearSelectedWalk():PartialStateUpdater<WalkSlice>{
    return _ => ({selectedWalk: null})
}