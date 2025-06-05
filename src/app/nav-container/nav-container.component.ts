import { Component, computed, inject, Signal } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";
import { Router } from '@angular/router';
import { UserStore } from '../store/user/user.store';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-container',
  standalone:true,
  imports: [ItemListComponent, NgIf],
  templateUrl: './nav-container.component.html',
  styleUrl: './nav-container.component.css'
})
export class NavContainerComponent{

  private userStore = inject(UserStore)
  private readonly router = inject(Router)
  loggedInName: Signal<string | undefined> = computed(() => this.userStore.name?.())

  logOutUser = ()=>{
    this.router.navigate(['login'])
  }
  
}
