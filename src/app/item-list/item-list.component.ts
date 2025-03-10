import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { walksObject } from '../walksObject';
import { DetailsPanelComponent } from '../details-panel/details-panel.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [NgFor, DetailsPanelComponent, StarRatingComponent, NgClass],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  selectedWalk: any;
  walksObj = [...walksObject]; 

  sendWalk(walk: any) {
    this.selectedWalk = walk;
  }

  getDifficultyColour(difficulty: number): string {
    return {
      1: 'text-green-700',
      2: 'text-green-700',
      3: 'text-orange-700',
      4: 'text-red-700',
      5: 'text-red-700'
    }[difficulty] || '';
  }

  sortRating() {
    this.walksObj = [...walksObject].sort((a, b) => b.rating - a.rating);
  }

  sortLevel() {
    this.walksObj = [...walksObject].sort((a, b) => b.difficulty - a.difficulty);
  }

  sortCompleted() {
    this.walksObj = [...walksObject].sort((a, b) => Number(b.completed) - Number(a.completed));
  }

  sortToDo() {
    this.walksObj = [...walksObject].sort((a, b) => Number(a.completed) - Number(b.completed));
  }
}
