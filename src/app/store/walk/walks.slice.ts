import { Walk } from "../../models/Walk"

export interface WalkSlice {
    walks: Walk[],
    selectedWalk: Walk | null,
    allWalks: Walk[],
    isLoading: boolean
}

export const initialWalkSlice: WalkSlice = {
    walks: [],
    selectedWalk: null,
    allWalks: [],
    isLoading: false,
}