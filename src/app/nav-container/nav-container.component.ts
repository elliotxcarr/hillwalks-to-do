import { Component, inject, OnInit } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";
import { Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserName } from '../state/userState/user.selectors';

@Component({
  selector: 'app-nav-container',
  standalone:true,
  imports: [ItemListComponent, NgIf, AsyncPipe],
  templateUrl: './nav-container.component.html',
  styleUrl: './nav-container.component.css'
})
export class NavContainerComponent {

  private readonly router = inject(Router)
  private readonly store = inject(Store)
  userState: Observable<string | null | undefined> = this.store.select(selectUserName);
  usersName?: string | null = null;
  
  constructor(){
   
  }

  getName(){
    this.userState?.subscribe((name)=> this.usersName = name)
  }

  
  logOutUser = ()=>{
    this.router.navigate(['login'])
  }

}
