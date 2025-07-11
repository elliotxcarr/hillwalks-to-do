import { Walk } from "../../models/Walk";

export interface UserSlice{
    _id: string;
    username: string;
    name: string;
    age: number;
    email: string;
    completed_walks: Walk[];
}

export const initialUserSlice: UserSlice = {
    _id: '',
    username: '',
    name: '',
    age: 0,
    email: '',
    completed_walks: []
}
