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

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    DetailsPanelComponent,
    StarRatingComponent,
    NgClass,
    SpinnerComponent,
    NgFor,
    SearchBarComponent,
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})

export class ItemListComponent {
  readonly walkStore = inject(WalkStore);

  sortOptions: string[] = ['Rating', 'Level', 'Completed', 'Todo'];

  getDifficultyColour(difficulty: number): string {
    return (
      {
        1: 'text-green-700',
        2: 'text-green-700',
        3: 'text-orange-700',
        4: 'text-red-700',
        5: 'text-red-700',
      }[difficulty] || ''
    );
  }
}
