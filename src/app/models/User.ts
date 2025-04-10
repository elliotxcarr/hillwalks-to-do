import { Walk } from "./Walk";

 export interface User{
    id: string | null;
    username: string | null;
    password: string | null;
    name: string | null;
    age: number | null;
    email:string | null;
    completedWalks: Walk[] | null;
}