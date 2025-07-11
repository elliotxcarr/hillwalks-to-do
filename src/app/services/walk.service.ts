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

    saveCompletedWalk(user_id: string, walk_id: string){
        return this.http.post<Walk[]>(
            `http://localhost:5001/users/${user_id}/completed_walks`,
            {walk_id}
        );
    }

    deleteCompletedWalk(user_id: string, walk_id: string){
        return this.http.delete<Walk>(
            `http://localhost:5001/users/${user_id}/${walk_id}/completed_walks`)
    }
}