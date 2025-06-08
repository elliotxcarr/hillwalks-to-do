import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  inject,
  Signal,
} from '@angular/core';
import { DetailsPanelComponent } from '../details-panel/details-panel.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { Walk } from '../models/Walk';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { WalkStore } from '../store/walk/walks.store';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [
    DetailsPanelComponent,
    StarRatingComponent,
    NgClass,
    NgIf,
    SpinnerComponent,
    NgFor,
    SearchBarComponent,
  ],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})

export class ItemListComponent {
  private walkStore = inject(WalkStore);
  searchTerm: string = '';

  selectedWalk: Signal<Walk | null> = this.walkStore.selectedWalk;

  combinedWalks:Signal<Walk[]> = this.walkStore.walksToDisplay;

  sortOptions: string[] = ['Rating', 'Level', 'Completed', 'Todo'];

  onSearch(term: string) {
    //this.searchTerm = term;
  }

  sendWalk(walk: Walk) {
    this.walkStore.setSelectedWalk(walk)
  }

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

  handleSort(option: string) {
    this.walkStore.sortWalks(option)
  }
}
