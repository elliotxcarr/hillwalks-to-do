import { NgClass, NgFor} from '@angular/common';
import {
  Component,
  inject,
} from '@angular/core';
import { StarRatingComponent } from '../utils/star-rating/star-rating.component';
import { SpinnerComponent } from '../utils/spinner/spinner.component';
import { WalkStore } from '../store/walk/walks.store';
import { SearchBarComponent } from '../utils/search-bar/search-bar.component';
import { DetailsPanelComponent } from './details-panel/details-panel.component';
import { UserStore } from '../store/user/user.store';
import { WalkItemComponent } from "./walk-item/walk-item.component";

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    DetailsPanelComponent,
    NgClass,
    SpinnerComponent,
    SearchBarComponent,
    WalkItemComponent
],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})

export class ItemListComponent {
  readonly walkStore = inject(WalkStore);
  readonly userStore = inject(UserStore);
  sortOptions: string[] = ['Rating', 'Level', 'Completed', 'Todo'];  
}
