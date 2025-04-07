import { Component, inject, OnInit } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { selectUser } from '../state/app.selectors';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-container',
  standalone:true,
  imports: [ItemListComponent, AsyncPipe, NgIf],
  templateUrl: './nav-container.component.html',
  styleUrl: './nav-container.component.css'
})
export class NavContainerComponent {

  private readonly router = inject(Router)
  private readonly store = inject(Store)
 
  loggedInUser$:Observable<User | null> = this.store.select(selectUser);


 
  logOutUser = ()=>{
    this.router.navigate(['login'])
  }

}
