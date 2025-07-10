import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Walk } from "../models/Walk";
import { catchError, Observable, of, shareReplay } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class WalkService {
    private readonly http = inject(HttpClient);

    getAllWalks(): Observable<Walk[]>{
        return this.http.get<Walk[]>('http://localhost:5001/walks')
    }

    saveCompletedWalk(userId: string, walk_id: string){
        console.log("in save completed walk")
        return this.http.post<Walk[]>(
            `http://localhost:5001/users/${userId}/completed_walks`,
            {walk_id}
        );
    }
}