import { Component } from '@angular/core';
import { ItemListComponent } from "../item-list/item-list.component";

@Component({
  selector: 'app-nav-container',
  imports: [ItemListComponent],
  templateUrl: './nav-container.component.html',
  styleUrl: './nav-container.component.css'
})
export class NavContainerComponent {

}
