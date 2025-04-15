import { inject, Injectable } from "@angular/core";
import { User } from "../models/User";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { getUser, selectUserState } from "../state/userState/user.selectors";

@Injectable({
    providedIn: 'root',
})

export class UserService{
    private store = inject(Store);
    loggedInUser$: Observable<User> = this.store.select(getUser)
    
}