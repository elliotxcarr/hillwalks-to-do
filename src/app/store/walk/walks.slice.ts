import { Walk } from "../../models/Walk"

export interface WalkSlice {
    selectedWalk: Walk | null,
    isLoading: boolean,
    sortOption:string,
    searchTerm: string
}

export const initialWalkSlice: WalkSlice = {
    selectedWalk: null,
    isLoading: false,
    sortOption: '',
    searchTerm: '',
}