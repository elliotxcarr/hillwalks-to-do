import { Component, inject } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";
import { UserStore } from '../store/user/user.store';
import { AuthStore } from '../store/auth/auth.store';

@Component({
  selector: 'app-nav-container',
  standalone:true,
  imports: [ItemListComponent],
  templateUrl: './nav-container.component.html',
  styleUrl: './nav-container.component.css'
})
export class NavContainerComponent{

  readonly userStore = inject(UserStore)
  readonly authStore = inject(AuthStore)
}
