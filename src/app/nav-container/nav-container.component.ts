import { Component, inject, OnInit } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";
import { Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { selectUserName } from '../state/userState/user.selectors';
import { UserService } from '../services/user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-nav-container',
  standalone:true,
  imports: [ItemListComponent, NgIf, AsyncPipe],
  templateUrl: './nav-container.component.html',
  styleUrl: './nav-container.component.css'
})
export class NavContainerComponent implements OnInit{

  private readonly router = inject(Router)
  private readonly store = inject(Store)
  private userService = inject(UserService)
  user!: User;
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    this.userService.loggedInUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
      });

      this.user.completed_walks.forEach(element => {
        console.log(element)
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  logOutUser = ()=>{
    this.router.navigate(['login'])
  }
  
}
