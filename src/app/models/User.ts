import { Walk } from "./Walk";

 export interface User{
    _id: string ;
    username: string;
    password: string ;
    name: string ;
    age: number ;
    email:string;
    completedWalks: Walk[] ;
}