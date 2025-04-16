import { Component, inject, OnInit } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/User';
import { Store } from '@ngrx/store';
import { logOutUser } from '../state/userState/user.actions';

@Component({
  selector: 'app-nav-container',
  standalone:true,
  imports: [ItemListComponent],
  templateUrl: './nav-container.component.html',
  styleUrl: './nav-container.component.css'
})
export class NavContainerComponent implements OnInit{

  private store = inject(Store)
  private readonly router = inject(Router)
  private userService = inject(UserService)

  user!: User;
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    this.userService.loggedInUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logOutUser = ()=>{
    this.router.navigate(['login'])
    this.store.dispatch(logOutUser())
    
  }
  
}
