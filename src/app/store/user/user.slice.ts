import { Walk } from "../../models/Walk";

export interface UserSlice{
    id: string;
    username: string;
    name: string;
    age: number;
    email: string;
    completed_walks: Walk[];
}

export const initialUserSlice: UserSlice = {
    id: '',
    username: '',
    name: '',
    age: 0,
    email: '',
    completed_walks: []
}
