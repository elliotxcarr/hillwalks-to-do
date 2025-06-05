import { NgClass, NgFor, NgIf } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { DetailsPanelComponent } from '../details-panel/details-panel.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { Walk } from '../models/Walk';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserStore } from '../store/user/user.store';
import { SessionStore } from '../store/session/session.store';

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
  private userStore = inject(UserStore);
  private sessionStore = inject(SessionStore);
  searchTerm: string = '';

  selectedWalk: Walk | null = null;

  sortOption = signal<string>('');

  combinedWalks:Signal<Walk[]> = this.sessionStore.walksToDisplay;

  sortedWalks: Signal<Walk[]> = computed(() => {
    const walks = this.combinedWalks();
    switch (this.sortOption().toLowerCase()) {
      case 'rating':
        return [...walks].sort((a, b) => b.rating - a.rating);
      case 'level':
        return [...walks].sort((a, b) => b.difficulty - a.difficulty);
      case 'completed':
        return [...walks].sort(
          (a, b) => Number(b.completed) - Number(a.completed)
        );
      case 'todo':
        return [...walks].sort(
          (a, b) => Number(a.completed) - Number(b.completed)
        );
      default:
        return walks;
    }
  });

  sortOptions: string[] = ['Rating', 'Level', 'Completed', 'Todo'];

  onSearch(term: string) {
    //this.searchTerm = term;
  }

  clearSelection() {
    this.selectedWalk = null;
  }

  sendWalk(walk: Walk) {
    this.selectedWalk = walk;
  }

  handleWalkComplete(walk: Walk) {
    this.userStore.saveCompletedWalk(walk);
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
    this.sortOption.set(option);
  }
}
