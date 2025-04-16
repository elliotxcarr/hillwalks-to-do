import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Walk } from "../models/Walk";
import { catchError, of, shareReplay } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class WalkService {
    private readonly http = inject(HttpClient);

    getAllWalks(){
        return this.http.get<Walk[]>('http://localhost:5001/walks').pipe(
            catchError(err => {
                console.error(err);
                return of([] as Walk[]);
            }),
            shareReplay(1)
        )
    }

    // getCompletedWalks(userId:string){
    //     return this.http.get<Walk[]>(`http://localhost:5001/users/${userId}/completed_walks`).pipe(
    //         catchError(err => {
    //             console.error(err);
    //             return of([]);
    //         }),
    //     )
    // }
    
    saveCompletedWalk(userId: string, walk: Walk){
        console.log("in save completed walk")
        return this.http.post<Walk[]>(
            `http://localhost:5001/users/${userId}/completed_walks`,
            {walk}
        );
    }
}