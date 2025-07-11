import { Walk } from "../../models/Walk"

export interface WalkSlice {
    selectedWalk: Walk | null,
    isLoading: boolean,
    sortOption:string,
    searchTerm: string,
    _walks: Walk[],
}

export const initialWalkSlice: WalkSlice = {
    selectedWalk: null,
    isLoading: false,
    sortOption: '',
    searchTerm: '',
    _walks:[]
}