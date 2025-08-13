import { Walk } from "./Walk";

export interface User{
    id: string ;
    username: string;
    name: string ;
    age: number ;
    email:string;
    completed_walks: Walk[] ;
    walks: Walk[];
}