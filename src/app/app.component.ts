import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { DetailsPanelComponent } from './details-panel/details-panel.component';

@Component({
  selector: 'app-root',
  imports: [ ItemListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  

}
